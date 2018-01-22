import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'
let todoID = 1

const Filter = {
    0: 'All',
    1: 'Active',
    2: 'Completed'
};

const state = {
	todos: [],
	newTodo: '',
	editedTodo: null,
	currentFilter: Filter[0]
}

const getters = {
	newTodo: state => state.newTodo,
	todos: state => state.todos,
	editedTodo: state => state.editedTodo,
    filteredTodos: state => {
    	switch(state.currentFilter) {
    		case Filter[0]:
    			return state.todos;
    			break;
    		case Filter[1]:
    			return state.todos.filter(todo => !todo.completed)
    			break;
    		case Filter[2]:
    			return state.todos.filter(todo => todo.completed)
    			break;
    	}
    },
    filters: state => Object.values(Filter),
    currentFilter: state => state.currentFilter
}

const actions = {
	setTodo({commit}, todo) {
		commit(types.SET_TODO, todo);
	},
	setEditedTodo({commit}, todo) {
		commit('SET_EDITED_TODO', todo)
	},
	addTodo({commit}) {
		commit('ADD_TODO');
	},
	editTodo({commit}, todo) {
		commit('EDIT_TODO', todo)
	},
	removeTodo({commit}, todo) {
		commit('REMOVE_TODO', todo)
	},
	toggleTodo({commit}, todo) {
		commit('TOGGLE_TODO', todo)
	},
	clearTodo({commit}) {
		commit('CLEAR_TODO')
	},
	changeFilter({commit}, filter) {
		commit('CHANGE_FILTER', filter)
	}
}

const mutations = {
	[types.SET_TODO](state, todo) {
		state.newTodo = todo;
	},
	SET_EDITED_TODO(state, todo) {
		state.editedTodo = todo;
	},
	ADD_TODO(state) {
		state.todos.push({
			id: todoID++,
			title: state.newTodo,
			completed: false
		})
	},
	EDIT_TODO(state, todo) {
		let todos = state.todos
		let item = todos.find(t => t.id == todo.id)
		item.title = state.editedTodo
	},
	REMOVE_TODO(state, todo) {
		let todos = state.todos
		todos.splice(todos.indexOf(todo), 1)
	},
	TOGGLE_TODO(state, todo) {
		todo.completed = !todo.completed;
	},
	CLEAR_TODO(state) {
		state.newTodo = ''
	},
	CHANGE_FILTER(state, filter) {
		state.currentFilter = filter;
	}
}

export default new Vuex.Store({
	state,
	strict: debug,
	getters,
	actions,
	mutations
})