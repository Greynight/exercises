 Small web application, bootstrapped with create-react-app, using components from material-ui, axios to do ajax requests,
 reflexbox for page layout, react-chartjs-2 for charts and redux as state container.
 
 It can be used to track progress in trainings. It's possible to configure users, exercises and parameters that
  should be tracked. As well, as already existing parameters(like maximum, total and averaged weight or number)
   can be used, new parameters(using your formulas) can be defined.


 Try it:
 https://greynight.github.io/exercises/

<h7>INSTALL</h7>

Clone repository and run `npm install` or `yarn`

<h7>RUN</h7>

`npm start` or `yarn start`

<h7>CONFIGURATION</h7>

All configuration changes can be done in js files in *config* folder.

**Data loaders**

By default local Storage is used as a storage. But it's possible to use data-loaders for 
<a href="https://mlab.com">mLab</a>. Or any other data-loaders can be defined in _dataLoaders.js_ and used in 
_Config.js_.

**Users**

Users can be added, removed, edited, activated/deactivated in file _users.js_.

**Exercises**

Exercises can be found in file _exercises.js_. Where: <br>
 `results` - for example weight, number, calories, distance;<br>
 `params` - parameters defined in file `params.js` which will be used to build charts(like Maximum Weight or 
 Maximum Number);
 
**Tracking parameters**
 
 Parameters defined in file `params.js`, for example Maximum Weight or Maximum Number. These parameters can be 
 extended by yours, using existing or new formulas.
