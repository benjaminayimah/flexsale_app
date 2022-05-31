import { mapGetters } from "vuex"
import moment from 'moment'
export default {
    computed: {
        ...mapGetters(['getNotifications']),
        computedNotifications() {
            let key1 = 'low-stocks'
            let key2 = 'expired'
            let key3 = 'expiring-soon'
            const notificationArr = []
            if(this.getNotifications.length > 0) {
                const lowfilter = this.getNotifications.filter(data => data.key == key1)
                let count1 = lowfilter.length
                if(count1 > 0 ) {
                    let last_id1 = count1-1
                    const lowObj = {
                        image: lowfilter[0].image,
                        key: key1,
                        count: count1,
                        title: 'Low stock',
                        time: lowfilter[last_id1].created_at,
                        color: '#566FF4',
                        read: lowfilter[last_id1].read,
                        message: count1 + ' products have low stock.'
                    }
                    notificationArr.push(lowObj)
                }
                const expfilter = this.getNotifications.filter(data => data.key == key2)
                let count2 = expfilter.length
                if(count2 > 0) {
                    let last_id2 = count2-1
                    const expObj = {
                        image: expfilter[0].image,
                        key: key2,
                        count: count2,
                        title: 'Expired',
                        time: expfilter[last_id2].created_at,
                        color: '#E63232',
                        read: expfilter[last_id2].read,
                        message: count2 + ' products have expired. Please remove them.'
                    }
                    notificationArr.push(expObj)
                }
                const exringfilter = this.getNotifications.filter(data => data.key == key3)
                let count3 = exringfilter.length
                if(count3 > 0) {
                    let last_id3 = count3-1
                    const exringObj = {
                        image: exringfilter[0].image,
                        key: key3,
                        count: count3,
                        title: 'Expiring soon',
                        time: exringfilter[last_id3].created_at,
                        color: '#F49F56',
                        read: exringfilter[last_id3].read,
                        message: count3 +' products are near expiration.'
                    }
                    notificationArr.push(exringObj)
                }
                return notificationArr
            }else
            return []
        }
    },
    methods: {
        dateTime(value) {
            return moment(value).fromNow()
        }
    }
}