##NinjaComb for AfterEffects

Copyright VAS www.vas.it

An AfterEffects script for automated pulldown removing, file merging and cleanup. Especially tailored for [Atomos Ninja](http://www.atomos.com/ninja/) output files.

Tested and working on AfterEffects CS5.5 & CS6. Should work from CS3+

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

##License

  Copyright (c) 2013 - Enrico Targetti (enrico@vas.it)
  					 VAS (www.vas.it)

	MIT License

	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

