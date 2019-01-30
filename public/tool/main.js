Vue.component('alert-box', {
    template: `
    <div class="num-trans">
        <div class="columns is-gapless">
            <div class="column is-7">
                <input v-model="inputVal" class="input is-round" placeholder="输入如：1010 1100"></input>
            </div>
            <div class="column is-2">
                <div class="select">
                    <select v-model="selectVal">
                        <option> 二进制</option>
                        <option> 十进制</option>
                        <option> 十六进制</option>
                    </select>
                </div>
            </div>
            <div class="column is-1">
                <button class="button" v-on:click="trans">转换</button>
            </div>
        </div>
        <pre>
<code class="code">{{ transAnswer }}</code>
        </pre>
    </div>
    `,
    data: function () {
        return {
            inputVal: '',
            selectVal: '二进制',
            transAnswer: '\n\n\n',
        }
    },
    methods: {
        trans: function () {
            // console.log(this.selectVal)
            var ans;
            switch (this.selectVal) {
                case '二进制': 
                    ans = binToAll(this.inputVal)
                    break;
                case '十进制':
                    ans = decToAll(this.inputVal)
                    break;
                case '十六进制':
                    ans = hexToAll(this.inputVal)
                    break;
                default:
                    ans = binToAll(this.inputVal)
            }
            
            if (ans.result === 1) {
                this.transAnswer = '[origin] : ' + ans.origin + '\n' +
                '[Dec]    : ' + ans.Dec + '\n' +
                '[Bin]    : ' + ans.Bin + '\n' + 
                '[Hex]    : ' + ans.Hex
            } else {
                this.transAnswer = ans.message + '\n\n\n'
            }
        }
    }
})

Vue.component('alert-box2', {
    template: `
        <div class="demo-alert-box">
            <strong>Error2!</strong>
            <slot></slot>
        </div>
    `
})

function setActive () {
    const menulist = Array.prototype.slice.call(document.getElementById('menu').children)
    menulist.forEach(element => {
        if (element.children[0].getAttribute('name') === tool.currentComponent) {
            element.children[0].classList.add('isactive')
            // console.log('aa')
        } else {
            element.children[0].classList.remove('isactive')
        }
    });
}

var tool = new Vue({
    el: '#tools',
    data: {
        menus: [
            {title : '进制转换', name : 'alert-box'}
        ],
        // title: 'Title',
        currentComponent: 'alert-box'
    },
    methods: {
        changeMenu : function (e) {
            console.log(e.target.name)
            this.currentComponent = e.target.name
            setActive()
        }
    }
})