<template>
    <div id="create-todo" class="todo-create__outer">
        <div v-show="!createMode">
            <button 
                type="button" 
                class="button todo-create__button" 
                @click="create"
            >
                <mdi-plus-icon fill="#fc6462" class="todo-create__button-icon inl-b-centered"/>
                <span class="todo-create__button-text inl-b-centered">Add task</span>
            </button>
        </div>
        <div v-show="createMode">
            <input 
                class="input todo-create__input"
                :value="newTodo"
                ref="createTodo"
                @change="set"
                @keyup.enter="add"
                @keyup.esc="cancel"
                placeholder="I need to...">
            <button 
                type="button" 
                class="button button--rounded button--red todo-create__add" 
                @click="add"
            >Add</button>
            <button 
                type="button" 
                class="button" 
                @click="cancel"
            >Cancel</button>
        </div>
    </div>
</template>
<script>
import 'mdi-vue/PlusIcon';
import { mapActions, mapGetters } from 'vuex'

export default{
    data() {
        return {
            createMode: false
        }
    },
    methods: {
        ...mapActions([
            'setTodo',
            'addTodo',
            'clearTodo'
        ]),
        set(e){
            this.setTodo(e.target.value)
        },
        add(){
            this.addTodo();
            this.clearTodo();
            this.toggleCreate();
        },
        toggleCreate() {
            this.createMode = !this.createMode;
        },
        create() {
            this.toggleCreate();
            this.$nextTick(() => 
                this.$refs.createTodo.focus()
            )
        },
        cancel() {
            this.toggleCreate();
            this.clearTodo();
        }
    },
    computed: {
        ...mapGetters([
            'newTodo'
        ]) 
    }
}
</script>

<style lang="scss" scoped>
@import '../styles/props';

.todo-create {
    &__outer {
        height: 40px;
    }

    &__button {
        outline: none;

        &-icon {
            padding-right: 10px;
        }

        &-text {
            line-height: 1.4;
            color: $brown;
        }
    }

    &__input {
        padding: 8px 12px;
        font-size: 16px;
        border-radius: 4px;
        width: 415px;
    }

    &__add {
        padding: 9px 20px;
        margin-left: 10px;
    }
}
</style>
