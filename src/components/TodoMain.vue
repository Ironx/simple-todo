<template>
	<div class="todo__outer">
		<todo-create />
		<ul class="todo__filters">
			<todo-filter v-for="filter in filters" :filter="filter" :key="filter"></todo-filter>
		</ul>
		<todo-item v-for="todo in filteredTodos" :key="todo.id" :todo="todo"/>
	</div>
</template>

<script>
import TodoCreate from './TodoCreate.vue'
import TodoItem from './TodoItem.vue';
import TodoFilter from './TodoFilter.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: "TodoMain",
	computed: {
		...mapGetters([
			'filteredTodos',
			'filters'
		]) 
	},
	components: {
		TodoCreate,
		TodoItem,
		TodoFilter
	}
}
</script>

<style lang="scss" scoped>
@import '../styles/props';

.todo {
    &__outer {
        width: 599px;
        margin: 50px auto 0;
    }
    
    &__filters {
        display: inline-block;
        margin: 20px 0 35px;
        padding: 0;
        list-style-type: none;
    }
}
</style>
