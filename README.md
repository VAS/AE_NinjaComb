##NinjaComb for AfterEffects

Copyright VAS www.vas.it

The script does the following:

- removes 3:2 pulldown from each of the selected clips 
- creates a new composition for each take
- joins the sparse video files produced by Ninja.
- clips are scaled to 120% in order to obtain a correct 16:9 image 
  (the HDMI output of the Canon 550D/7D et simila is letterboxed).
- Lastly, it adds the new compositions to the render queue, using default settings. 

###USAGE:

   - Order the desired clips by NAME in ASCENDING order, in the project pane.
   - Select all of them
   - Launch the script from the File->Script menu.


###CAVEAT: 
   - Make sure to select only VIDEO files, no images, no, solids, no folders..
   - By now the scripts expects the files names to be in the format scene#.shot#.take#.part#.mov
   - The files must have unique names
   - The original frame rate of the footage must be 24p, encapsulated in 30i by 3:2 pulldown 

     		
###TODO:
   - The script itself should order the clips by name
   - Making a GUI to let the user specify some parameters like the resize factor, the naming convention or the output file format.
   - In case the video has been recorded in 25p the script shouldn't attempt to remove pulldown and perform a simple de-interlace instead.
   - Adding support fort 3rd party plugins. E.g. Magic Bullet for the resizing.
   - Tidy up code.
