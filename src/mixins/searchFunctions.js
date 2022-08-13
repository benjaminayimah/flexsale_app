import axios from 'axios'
import { mapGetters } from "vuex"
export default {
    computed: {
        ...mapGetters(['getWindowHeight', 'getToken', 'getHostname', 'getCurrentStore']),
        computedResults() {
            let result = this.searchResults
            let history = this.history
            if (result.length > 0) {
                return { type: 'search', array: result }
            }
            else if (history) {
                return { type: 'history', array: history.sort((a, b) => new Date(b.time) - new Date(a.time)) }
            }
            else
            return { type: '', array: []}
        }
    },
    data() {
        return {
            form: {
                input: ''
            },
            submitting: false,
            searchResults: [],
            history: [],
            isFocused: false,
            dropdownIn: false
        };
    },
    methods: {
        clearInput() {
            console.log('me')
            this.form.input = ''
            this.searchResults = ''
            this.$nextTick(function () {
                this.$refs.searchInput.focus();
            });
        },
        showResultsFloat: function () {
            this.isFocused = true;
            this.dropdownIn = true;
            const history = JSON.parse(localStorage.getItem('searchHistory'))
            history ? this.history = history : []
        },
        hideResultsFloat: function () {
            // if (this.form.input == '')
                this.isFocused = false;
        },
        chechInput(input) {
            let str = document.getElementById(input).value;
            if(!str.match(/^\s*$/)) {
                return true
            }else {
                this.searchResults = []
                return false
            }
        },
        async doSearch(input) {
            if(this.chechInput(input)) {
                this.submitting = true
                axios.post(this.getHostname + "/api/search?token=" + this.getToken, { query: this.form.input })
                .then((res) => {
                    this.submitting = false
                    this.searchResults = res.data.results
                    console.log(res.data)
                });
            }
        },
        goTo(id, name) {
            this.$store.dispatch('fetchThisProduct',id)
            this.$router.push({ name: 'ProductDetailsBasic',  params: { id: id, name: name }, replace: true })
            this.isFocused = false
            this.$refs.searchInput.blur()
        },
        setHistory(id, name, stock, image, type) {
            const array = []
            const newHistory = { id: id, name: name, stock: stock, image: image, prod_type: type, time: new Date()  }
            const oldHistory = JSON.parse(localStorage.getItem('searchHistory'))
            if(oldHistory) {
                const duplicate = oldHistory.find(data => data.id == id)
                if(!duplicate) {
                    oldHistory.push(newHistory)
                    localStorage.setItem('searchHistory', JSON.stringify(oldHistory))
                }
            }else{
                array.push(newHistory)
                localStorage.setItem('searchHistory', JSON.stringify(array))
            }
        },
        delThisHistory(time) {
            let oldHistory = JSON.parse(localStorage.getItem('searchHistory')).filter(data => data.time !== time)
            localStorage.removeItem('searchHistory')
            if(oldHistory.length > 0) {
                localStorage.setItem('searchHistory', JSON.stringify(oldHistory))
            }
            this.history = oldHistory
        },
        clearHistory() {
            localStorage.removeItem('searchHistory')
            this.history = []
        }
    },
}