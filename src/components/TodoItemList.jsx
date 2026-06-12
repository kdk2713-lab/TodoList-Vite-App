import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import TodoItem from '@components/TodoItem';
import { fetchAllTodos } from '@/reducers/todoSlice';
//import { fetchAllTodos } from '@/actions'

class TodoItemList extends Component {
    /*
        true(myTodos 변수에 변동이 있으면) 이면 render() 함수가 호출됨
        false(myTodos 변수에 변동이 없으면) 이면 render() 함수가 호출되지 않음 (렌더링 생략)
    */
    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.myTodos !== nextProps.myTodos ||
            this.props.loading !== nextProps.loading ||
            this.props.error !== nextProps.error
        );
    }
    //HTML DOM 렌더링 후에 호출되는 lifecyle method
    componentDidMount() {
        this.props.fetchAll();
    }

    render() {
        const { myTodos, loading, error } = this.props;

        if (loading) {
            return <div className="status-message loading">불러오는 중...</div>;
        }

        if (error) {
            return <div className="status-message error">오류 발생: {error}</div>;
        }

        const todoList = myTodos.map(
            ({ id, text, checked }) => (
                <TodoItem
                    id={id}
                    text={text}
                    checked={checked}
                    key={id}
                />
            )
        );
        return (
            <div>
                {todoList}
            </div>
        );
    }
}

TodoItemList.propTypes = {
    myTodos: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string,
    fetchAll : PropTypes.func
};

export default connect(
    (state) => ({
        myTodos: state.todos,
        loading: state.loading,
        error: state.error,
    }),
    { fetchAll: fetchAllTodos }
)(TodoItemList);