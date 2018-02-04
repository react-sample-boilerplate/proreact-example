// library
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// style
import './style/app.scss';

// container component App
import App from './container/App';

/*
    ReactDOM 모듈의 render 메서드를 이용해 
    App 컴포넌트를 렌더링 한다.
*/
ReactDOM.render(<App />, document.querySelector("#root"));