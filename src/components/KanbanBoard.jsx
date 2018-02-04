// Library
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// component
import List from './List';

// component class
export default class KanbanBoard extends Component {

    /*
        정적 변수로 propTypes를 설정
        isRequired를 체이닝하면 반드시 해당값이어야 함을 의미
    */
    static propTypes = {
        cards: PropTypes.arrayOf(PropTypes.object).isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            // iteration이 필효한 정보를 state에 저장
            list:[
                {title: 'To do', id: 'todo'},
                {title: 'In Progress', id: 'in-progress'},
                {title: 'Done', id: 'done'}
            ]
        };
    }

    renderList() {
        // 상위 컴포넌트에서 받은 props중에 cards만 가져와 cards 변수에 저장
        let { cards } = this.props;

        // state에 저장된 list를 가져와 <List> 컴포넌트를 해당되는 갯수만큼 배열로 반환
        let dom = this.state.list.map((item, idx) =>
            <List {...item}
                    key={idx}
                    cards={cards.filter(card => card.status == item.id)} />
        );

        // 가공된 dom 변수를 반환
        return dom;
    }

    // KanbanBoard 컴포넌트를 렌더
    render() {
        return (
            <div className="app">
                {this.renderList()}
            </div>
        );
    }
}