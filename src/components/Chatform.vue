<template>
    <div class="form chatform">
        <div class="top_bar"></div>
        <div class="content_outer">
            <div class="content" ref="message_list">
                <div class="loading" v-if="loading">
                    <b-icon icon="arrow-clockwise" animation="spin" font-scale="1.4"></b-icon>
                </div>
                <transition-group name="message">
                    <div class="message_outer" :class="{mymessage: item.Author == username}" v-for="(item, index) in messageList" :key="'msg_' + index">
                        <span class="author">{{item.Author}}</span>
                        <div class="message">
                            <p>{{item.Message}}</p>
                            <span class="date">{{getDate(item.Date)}}</span>
                            <button class="btn-delete" @click="deleteMessage(index)"></button>
                        </div>
                        
                    </div>
                </transition-group>
            </div>
        </div>
        <div class="bottom_bar">
            <div class="bottom_inner">
                <input class="myinput" v-model="inputMessage" placeholder="Сообщение |" @keyup.enter="addMessage()">
                <button class="send" @click="addMessage()"></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Chatform',
    props: {
        username: String,
    },
    data() {
        return {
            messageList: [
                {
                    "Author": "User1",
                    "Message": "Привет",
                    "Date": "Tue Apr 26 2022 13:30:34 GMT+0300 (Москва, стандартное время)"
                },
                {
                    "Author": "User2",
                    "Message": "Привет",
                    "Date": "Tue Apr 26 2022 13:31:34 GMT+0300 (Москва, стандартное время)"
                }
            ],
            inputMessage: "",
            loading: false,
            count: 0,
        }
    },
    methods: {
        addMessage() {
            if (!this.inputMessage) {
                return
            }
            var spaceTest = this.inputMessage.replace(/\s/g, '');
            if (spaceTest.length == 0) {
                return
            }
            var message = {};
            message.Date = new Date();
            message.Author = this.username;
            message.Message = this.inputMessage;
            this.messageList.push(message);
            this.inputMessage = "";
            this.sendMessage(message);

            var element = this.$refs.message_list;
            var oldScroll = element.scrollHeight;
            setTimeout(() => {
                var newScroll = element.scrollHeight;
                element.scrollTop = oldScroll + newScroll
            }, 100);
        },
        getDate(date) {
            var item = new Date(date)
            var hours = ('0'+item.getHours()).slice(-2);
            var minutes = ('0'+item.getMinutes()).slice(-2);
            return hours + ':' + minutes
        },
        deleteMessage(index) {
            this.messageList.splice(index, 1);
        },
        sendMessage(message) {
            message
            // отправляем на бэк
        },
        loadMore() {
            this.loading = true;
            var element = this.$refs.message_list;
            var oldScroll = element.scrollHeight;
            setTimeout(() => {
                for (let index = 0; index < 10; index++) {
                    this.count ++;
                    this.messageList.unshift({
                        "Author": "User1",
                        "Message": `Загруженное сообщение ` + this.count,
                        "Date": "Tue Apr 26 2022 13:30:34 GMT+0300 (Москва, стандартное время)"
                    })
                }
            }, 300);
            setTimeout(() => {
                this.loading = false;
                var newHeight = element.scrollHeight;
                element.scrollTop = newHeight - oldScroll;
            }, 301);
            
        }
    },
    mounted() {
        var element = this.$refs.message_list;
        element.scrollTop = element.scrollHeight
        element.addEventListener('scroll', () => {
            if (element.scrollTop == 0 && !this.loading) {
                this.loadMore();
            }
        });
        this.loadMore();
    },
}
</script>