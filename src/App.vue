<template>
    <div id="app">
        <transition name="list">
            <div class="form" v-if="!showChat">
                <label for="loginform">Введите логин</label>
                <input class="myinput" type="text" v-model="username" id="loginform" @keyup.enter="enterChat()">
            </div>
        </transition>
        <transition name="list">
            <Chatform v-if="showChat" :username="username" />
        </transition>
    </div>
</template>

<script>
import Chatform from './components/Chatform.vue'

export default {
    name: 'App',
    components: {
        Chatform
    },
    data() {
        return {
            username: "",
            showChat: false,
        }
    },
    methods: {
        enterChat() {
            if (this.username!="") {
                this.showChat = true;
            }
        }
    },
}
</script>