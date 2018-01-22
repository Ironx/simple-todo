<template>
	<div class="todo-item">
		<input 
            type="checkbox" 
            :id="`todo${todo.id}`" 
            v-model="checked" 
        />
		<template v-if="isEdited != true">
			<label 
                class="todo-item__label inl-b-centered" 
                v-if="isEdited != true" 
                @dblclick="edit"
            >{{todo.title}}</label>
            <button 
                type="button"
                class="button inl-b-centered todo-item__button"
                @click="edit"
            ><mdi-pencil-icon :width="20" fill="#604434" /></button>
			<button 
                type="button" 
                class="button inl-b-centered todo-item__button" 
                @click="remove"
            ><mdi-delete-icon :width="20" fill="#604434" /></button>
		</template>
		<template v-else>
			<input 
                type="text" 
                class="input todo-item__input inl-b-centered"
                :value="editedTodo" 
                @change="set" 
                @keyup.enter="confirm" 
                @keyup.esc="toggleEdit" 
            /> 
            <button 
                type="button"
                class="button button--rounded button--red todo-item__add inl-b-centered"
                @click="confirm"
            >Add</button>
			<button 
                type="button" 
                class="button inl-b-centered" 
                @click="toggleEdit"
            >Cancel</button>
		</template>
	</div>
</template>

<script>
import 'mdi-vue/PencilIcon';
import 'mdi-vue/DeleteIcon';
import { mapActions, mapGetters } from 'vuex'

export default {
	data() {
		return {
			isEdited: false
		}
	},
	props: {
		todo: {
			type: Object
		}
	},
	methods: {
		...mapActions([
			'toggleTodo',
			'editTodo',
			'removeTodo',
			'setEditedTodo'
		]),
		set(e) {
			this.setEditedTodo(e.target.value);
		},
		edit() {
			this.toggleEdit();
			this.setEditedTodo(this.todo.title);
		},
		remove() {
			this.removeTodo(this.todo);
		},
		confirm() {
			this.editTodo(this.todo);
			this.toggleEdit();
		},
		toggleEdit() {
			this.isEdited = !this.isEdited;
		}
	},
	computed: {
		...mapGetters([
			'editedTodo'
		]),
		checked: {
			get() {
				return this.todo.completed;
			},
			set(value) {
				this.toggleTodo(this.todo);
			}
		},
		edited() {
			return this.todo.title;
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../styles/props';

.todo-item {
    margin-bottom: 12px;

    &__label {
        max-width: calc(100% - 110px);
        padding: 0 10px;
        font-size: 15px;
        line-height: 1.4;
		cursor: text;
		color: $brown;
    }

    &__input {
        border-radius: 4px;
        padding: 7px 10px;
        margin-left: 10px;
        width: calc(100% - 200px);
        box-sizing: border-box;
    }

    &__button {
        font-size: 12px;
        padding: 0 3px;
    }

    &__add {
        padding: 9px 17px;
        margin-left: 10px;
    }
}
</style>