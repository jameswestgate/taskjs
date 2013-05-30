# TaskJS
Create a _Task_ object to execute javascript code in the background on any browser, without script timeout messages.

The following methods are used to schedule and execute work for a task:

<table>
<tbody>
<tr><td><a href="//github.com/jameswestgate/taskjs/wiki/Task.map">Task.map</a></td><td>Updates each element of the array provided with the result of the function. Used to schedule work for the <a href="//github.com/jameswestgate/taskjs/wiki/Task.execute">Task.execute</a> function.</td></tr>
<tr><td><a href="//github.com/jameswestgate/taskjs/wiki/Task.reduce">Task.reduce</a></td><td>Update a result with the result of the supplied function called on each value in the array parameter. Used to schedule work for the <a href="//github.com/jameswestgate/taskjs/wiki/Task.execute">Task.execute</a> function.</td></tr>
<tr><td><a href="//github.com/jameswestgate/taskjs/wiki/Task.execute">Task.execute</a></td><td>Begins execution of functions previously mapped to an array with the <a href="//github.com/jameswestgate/taskjs/wiki/Task.map">Task.map</a> and <a href="//github.com/jameswestgate/taskjs/wiki/Task.reduce">Task.reduce</a> methods.</td></tr>
<tr><td><a href="//github.com/jameswestgate/taskjs/wiki/Task.reset">Task.reset</a></td><td>Clears all data and resets the task.</td></tr>
</tbody>
</table>
