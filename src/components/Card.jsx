// Library
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'; // className util - https://www.npmjs.com/package/classnames
import marked from 'marked'; // marked docs to HTML - https://www.npmjs.com/package/marked

// component
import CheckList from './CheckList';

// custom prop-type
let titlePropTypes = (props, propName, componentName) => {
    if (props[propName]) {
        let value = props[propName];
        if ( typeof value !== 'string' || value.length > 80 ) {
            return new Error(
                `${propName} in ${componentName} is longer than 80 charaters`
            )
        }
    }
}

export default class Card extends Component {

    // 정적 변수로 propTypes를 설정
    static propTypes = {
        id: PropTypes.number.isRequired,
        title: titlePropTypes,
        description: PropTypes.string,
        color: PropTypes.string,
        task: PropTypes.arrayOf(PropTypes.object)
    }

    constructor(props) {
        super(props);
        this.state = {
            showDetails: false  // 상세내용 핸들링
        };
    }

    // 상세내용을 토글시키는 메서드
    toggleDetails = _ => {
        // showDetails state를 반전시키는 역할만 하고 있다.
        this.setState({
            showDetails: !this.state.showDetails
        });
    }

    // 상세내용을 반환하는 메서드
    renderCardDetails = _ => {
        /*
            state의 showDetails의 값에 따라 
            상세내용의 JSX를 반환하거나 반환하지 않는다.
        */
        if ( this.state.showDetails ) {
            return (
                <div className="card__details">
                    {marked(this.props.description)}
                    <CheckList {...CheckListProps} />
                </div>
            );
        } else {
            return null;
        }
    }

    // <Card> 컴포넌트를 렌더
    render() {

        // 전달 받은 props 중 id, tasks, description 프로퍼티를 각 프로퍼티명과 같은 변수명으로 각각 저장한다.
        let {id, tasks, description} = this.props;

        // <CheckList> 컴포넌트에 전달할 props를 object 타입으로 저장
        let CheckListProps = {cardId: id, tasks};

        // 반영될 className을 classnames 모듈을 이용해 저장
        let titleClass = classnames({
            'card__title': true,
            "card__title--is-open": this.state.showDetails
        });

        // 왼쪽에 붙는 컬러바 style
        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.color
        };
        
        return (
            <div className="card">
                <div style={sideColor} />
                <div className={titleClass}
                     onClick={this.toggleDetails} >
                    {this.props.title}
                </div>
                {this.renderCardDetails()}
            </div>
        );
    }
}