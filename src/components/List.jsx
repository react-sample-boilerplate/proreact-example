// Library
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// component
import Card from './Card';

// component class
export default class List extends Component {

    // 정적 변수로 propTypes를 설정
    static propTypes = {
        title: PropTypes.string.isRequired,
        cards: PropTypes.arrayOf(PropTypes.object)
    }

    // KanbanBoard 컴포넌트를 렌더
    render() {
        /*
            props로 전달받은 cards의 length만큼 <Crad> 컴포넌틑를 만들어 반환
        */
        let cards = this.props.cards.map((card, idx) => {
            return <Card {...card} key={idx} />
        });

        return (
            <div className="list">
                {/* props로 전달받은 title 값을 그대로 삽입 */}
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        );
    }
}