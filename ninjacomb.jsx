/**
 *
 * NinjaComb for AfterEffects
 *
 * Copyright VAS www.vas.it 
 *
 * The script does the following:
 * - removes 3:2 pulldown from each of the selected clips 
 * - creates a new composition for each take
 * - joins the sparse video files produced by Ninja.
 * - clips are scaled to 120% in order to obtain a correct 16:9 image 
 *   (the HDMI output of the Canon 550D/7D et simila is letterboxed).
 * - Lastly, it adds the new compositions to the render queue, using default settings. 
 *
 * USAGE:
 *    - Order the desired clips by NAME in ASCENDING order, in the project pane.
 *        - Select all of them
 * 		  - Launch the script from the File->Script menu.
 *
 * CAVEAT: 
 * 	  - Make sure to select only VIDEO files, no images, no, solids, no folders..
 *        - By now the scripts expects the files names to be in the format scene#.shot#.take#.part#.mov
 *        - The files must have unique names
 *        - The original frame rate of the footage must be 24p, encapsulated in 30i by 3:2 pulldown 			
 *
 * TODO:
 * 	  - The script itself should order the clips by name
 *    - Making a GUI to let the user specify some parameters like the resize factor, the naming convention or the output file format.
 *        - In case the video has been recorded in 25p the script shouldn't attempt to remove pulldown and perform a simple de-interlace instead.
 *        - Adding support fort 3rd party plugins. E.g. Magic Bullet for the resizing.
 *        - Tidy up code.
 *
 */

var selected = app.project.selection;
var i = 0;
var item ;
var blackList = Array();

var baseName;
var curComp;
var curLayer;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.beginUndoGroup("VAS_NinjaComb")

//Remove pulldown
for (i = 0; i < selected.length; i++)
{
    item = selected[i];
    item.mainSource.fieldSeparationType = FieldSeparationType.UPPER_FIELD_FIRST;
    item.mainSource.guessPulldown(PulldownMethod.PULLDOWN_3_2);
}

for (i = 0; i < selected.length; i++)
{
    item = selected[i];
    baseName = item.name.split('.'); //Create an array with this structure: [scene, shot, take, part, extension]
    
    //Create the new compositions
    if(contains(blackList, item) == false) //Check if the clip has not already been added to other comps.
    {
		compName = baseName[0] + '.' + baseName[1] + '.' + baseName[2] //name of composition: deleting the extension and the part number.
		curComp = app.project.items.addComp(compName, item.width, item.height, item.pixelAspect, item.duration, item.frameRate); //Create the new comp
		curLayer = curComp.layers.add(item);
		curLayer.scale.setValue([120, 120]);
		app.project.renderQueue.items.add(curComp); //Add the new comp to the render queue
    }
    
	//Loop the remaining clips, searching for the other parts of the same takel (start a new counter from where the last stopped).
    for (var j = (i+1); j < selected.length; j++)
    {
        var confItem = selected[j];
        var confName = confItem.name.split('.');
        
		if(isSameTake(baseName, confName) ) //Check if I found another part of the same take.
        {
			curLayer = curComp.layers.add(confItem);//Add the clip to the composition.
			curLayer.scale.setValue([120, 120]);
			curLayer.startTime= curComp.duration; //Shift the new clip at the end of the comp.
             curComp.duration += confItem.duration; 
             blackList.push(confItem); //Add the clip to blacklist: it's already in it's comp, I don't have to check it again.
        }
    }
}

app.endUndoGroup() 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//Function to check if two clips are part of the same take. Returns true if 'scene', 'shot' and 'take' fields of the two file names are the same. 
function isSameTake(a, b)
{
    if ( a[0]  == b[0] && a[1]  == b[1] && a[2]  == b[2])
        return true;
    else
        return false;
}

//Checks if an array contains a specifed object.
function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}
