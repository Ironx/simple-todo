<template>
	<li class="todo-filter__item" 
        :class="{ 'todo-filter__item--active': isActive}" 
        @click="change"
    > 
		<span class="todo-filter__text">{{filter}}</span>
	</li>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	props: ['filter'],
	methods: {
		...mapActions([
			'changeFilter'
		]),
		change() {
			this.changeFilter(this.filter);
		}
	},
	computed: {
		...mapGetters([
			'currentFilter'
		]),
		isActive() {
			return this.filter == this.currentFilter;
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../styles/props';

.todo-filter {
    &__item {
        display: inline-block;
        padding: 0 75px 7px;
        cursor: pointer;
        border-bottom: 2px solid $brown;

        &--active {
            color: $red;
            border-bottom: 2px solid $red;
        }
    }

    &__text {

        
    }
}
</style>
