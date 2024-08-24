Whiteboard Application Documentation
Overview
The Whiteboard Application is a versatile drawing and note-taking tool that allows users to create, modify, and manage drawings on a digital canvas. Built with React, it offers a range of features including drawing tools, text input, color customization, and more.

Features
Drawing Tools: Line, rectangle, circle, arrow, brush, and eraser.
Color and Size Customization: Adjust stroke and fill colors, as well as brush sizes.
Installation
To set up the Whiteboard Application on your local machine, follow these steps:

1. Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/whiteboard-application.git
2. Navigate to the Project Directory
bash
Copy code
cd whiteboard-application
3. Install Dependencies
Ensure you have Node.js installed. Then, run:

bash
Copy code
npm install
4. Start the Application
Run the development server with:

bash
Copy code
npm start
The application will be accessible at http://localhost:3000.

Usage
Drawing on the Canvas
Select a Tool: Use the toolbar to select a drawing tool.
Draw: Click and drag on the canvas to draw shapes or lines.
Erase: Select the eraser tool and drag over the areas you want to remove.
Add Text: Click on the canvas to add text. Customize the text using the toolbox options.
Customizing Tools
Color: Select stroke and fill colors from the toolbox.
Size: Adjust the size of your brush or other tools using the size options available in the toolbox.
Undo/Redo
Use the undo and redo buttons to correct or reapply changes.

Components
Board
Purpose: Provides the main drawing area.
Features: Handles drawing, erasing, and text input.
Toolbar
Purpose: Allows users to select different drawing tools.
Features: Displays icons for each tool and highlights the selected tool.
Toolbox
Purpose: Provides customization options for drawing tools.
Features: Allows users to select colors, adjust sizes, and more.
BoardProvider
Purpose: Manages the state and actions related to the drawing board.
Functions: Handles tool selection, drawing actions, and state updates.
ToolboxProvider
Purpose: Manages the state and actions related to the toolbox.
Functions: Handles color selection, size adjustments, and tool customization.
Development
Running Tests
To run tests for the application, use:

bash
Copy code
npm test
Building the Project
To create a production build, use:

bash
Copy code
npm run build
This will generate a build directory with optimized static files.

Contributing
We welcome contributions to the project! To contribute:

Fork the Repository: Click "Fork" on the repository page.

Create a New Branch:

bash
Copy code
git checkout -b your-branch-name
Make Changes: Commit your changes with clear, descriptive messages.

bash
Copy code
git add .
git commit -m "Description of changes"
Push Changes:

bash
Copy code
git push origin your-branch-name
Create a Pull Request: Submit a pull request to merge your changes.