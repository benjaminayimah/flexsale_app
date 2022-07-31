export default {
    data() {
        return {
            toggleFilter: false,
        }
    },
    methods: {
        doMenu(id) {            
            let elem = document.getElementById(id)
            if(this.toggleFilter === false) {
                this.toggleFilter = true
                document.body.classList.add('fixed-body')
                this.$store.commit('setDynamicFloatingDiv', elem)
            }
        },
        doDateToggle(id) { 
            this.toggleFilter ? this.closeJustMenu('stats_filter_toggle') : ''   
            let elem = document.getElementById(id)
            if(this.toggleCustomDate === false) {
                this.toggleCustomDate = true
                document.body.classList.add('fixed-body')
                this.$store.commit('setDynamicFloatingDiv', elem)
            }
        },
        closeJustMenu(id) {
            let elem = document.getElementById(id)
            this.toggleCustomDate = false
            this.toggleFilter = false
            this.$store.commit('reSetDynamicFloatingDiv', elem)
            document.body.classList.remove('fixed-body')
        },
        
    }
}