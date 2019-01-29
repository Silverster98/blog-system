Vue.component('alert-box', {
    template: `
        <div class="demo-alert-box">
            <strong>Error!</strong>
            <slot></slot>
        </div>
    `
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
            {title : '进制转换', name : 'alert-box'},
            {title : 'bb', name : 'alert-box2'}
        ],
        title: 'Title',
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