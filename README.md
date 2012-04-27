# TaskJS
Create a _Task_ object to execute javascript code in the background on any browser, without script timeout messages.

The following methods are used to schedule and execute work for a task:

<table>
<tbody>
<tr><td><a href="/jameswestgate/taskjs/wiki/Task.map">Task.map</a></td><td>Updates each element of the array provided with the result of the function. Used to schedule work for the [[execute|Task.execute]] function.</td></tr>
<<<<<<< HEAD
<tr><td>[[Task.reduce]]</td><td>Update a result with the result of the supplied function called on each value in the array parameter. Used to schedule work for the [[execute|Task.execute]] function.</td></tr>
<tr><td>[[Task.execute]]</td><td>Begins execution of functions previously mapped to an array with the [[map|Task.map]] and [[reduce|Task.reduce]] methods.</td></tr>
<tr><td>[[Task.reset]]</td><td>Clears all data and resets the task.</td></tr>
=======
<tr><td><a href="/jameswestgate/taskjs/wiki/Task.reduce">Task.reduce</a></td><td>Update a result with the result of the supplied function called on each value in the array parameter. Used to schedule work for the <a href="/jameswestgate/taskjs/wiki/Task.execute">Task.execute</a> function.</td></tr>
<tr><td><a href="/jameswestgate/taskjs/wiki/Task.execute">Task.execute</a></td><td>Begins execution of functions previously mapped to an array with the [[map|Task.map]] and [[reduce|Task.reduce]] methods.</td></tr>
<tr><td><a href="/jameswestgate/taskjs/wiki/Task.reset">Task.reset</a></td><td>Clears all data and resets the task.</td></tr>
>>>>>>> Updated Readme
</tbody>
</table>