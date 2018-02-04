import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CheckList extends Component {
    static propTypes = {
        cardId: PropTypes.number,
        task: PropTypes.arrayOf(PropTypes.object)
    }

    render() {
        let tasks = this.props.tasks.map((task, idx) => (
            <li className="checklist__task" key={idx}>
                <input type="checkbox"
                       defaultChecked={task.done} />
                {task.name}
                <a href="javascript:;" className="checklist__task--remove"></a>
            </li>
        ))
        return (
            <div className="checkList">
                { tasks.length ? <ul>{tasks}</ul> : null }
                <input type="text"
                       className="checklist--add-task"
                       placeholder="Type then hit Enter to add a task"
                       value={this.state.addTaskText}
                       ref="myInput"
                       onChange={this.onAddTask} />
                <button type="button" onClick={this.focusIn}>focus</button>
            </div>
        );
    }
}