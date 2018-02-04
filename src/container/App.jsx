// library
import React, { Component } from 'react';

// dummy data
import data from '../dummyData';

// components
import KanbanBoard from '../components/KanbanBoard';

export default class App extends Component {

    /*
        import한 KanbaBoard에 props name으로 cards를 통해
        data를 지정하고 컴포넌트를 렌더한다.
    */
    render() {
        return (
            <KanbanBoard cards={data} />
        )
    }

}