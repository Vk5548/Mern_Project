[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10443005&assignment_repo_type=AssignmentRepo)

# Reactjs, Tevin CSS, AXIOS CSS

This project has two components:
A. Backend: This is where we have written our API's and this component talks with mongodb database.
B. Frontend: This is where users search for the vehicle based on ElectricVehicleType or location.

Requirements:
A. pip3 & npm module should be installed.

Setup:
A. Backend: 
    - Dependency Installation:
        1. pip3 install -r backend/requirements.txt
    - Run:
        1. python3 backend/venv/src/api/backend_api.py

This will run the flask server with backend api's on port 5001

B. Frontend:
    - Dependency Installation:
        1. npm install client/my-search-app/package.json
        2. npm install axios // to conect to an end-point
    - Run: 
        1. npm start
This will start server where we have hosted our frontend on port 3000

To run on RLES:
1. cd /home/student/mongo-project-geek-army
2. python3 backend/venv/src/api/backend_api.py # start backend on port 5001
3. cd /home/student/mongo-project-geek-army/client/my-search-app
4. npm start # start frontend on port 3000

Note: 1. Search can only be done on `Electric Vehicle Type` ("battery" or "plug" or any other field)
      2. Searc can be done using latitude or longitude
