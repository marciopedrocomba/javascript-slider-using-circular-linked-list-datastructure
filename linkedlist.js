class Node {

    constructor(value) {

        this.value = value
        this.prev = null
        this.next = null

    }

}

class CircularLinkedList {

    constructor() {

        this.head = null
        this.tail = null 

    }

    append(value) {

        const temp = new Node(value)

        if(this.head == null) {

            this.head = this.tail = temp

        }else {

            temp.next = this.head
            temp.prev = this.tail
            this.tail.next = temp
            this.tail = temp
            this.head.prev = this.tail

        }

    }

    print() {

        if(this.head == null) return ''

        let temp = this.head
        let str = ''

        while(temp != null) {

            str += `${temp.value}->`
            if(temp.next == this.head) break
            temp = temp.next

        }

        console.log(str)


    }

}