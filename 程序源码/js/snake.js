//蛇对象
class Snake {
    constructor(select) {
        this.map = document.querySelector(select)
        //蛇的运动方向
        this.directhion = "right"
        //蛇的数组（把蛇的头和身体都会存储在数组中，头从数组的第0位开始）
        this.snakelist = []
        this.cnt = 0
        //创建蛇方法
        this.creatSnake()
        //蛇的朝向
        this.record = "right"
    }
    //创建蛇头函数
    createHead() {
        //获取数组当中第0位找到蛇头
        const head = this.snakelist[0]
        //定义坐标
        const pos = { x: 0, y: 0 }
        //const latter = { x: head.offsetLeft, y: head.offsetTop }
        if (head) {
            //如果有蛇头，创建新蛇头放到原先蛇头的后面坐标位置上
            //新蛇头坐标一定发生改变，改变方向需要罗列一下
            if (this.cnt == 0) {
                switch (this.directhion) {
                    case "left":
                        if (head.offsetLeft == 0) {
                            this.cnt++
                        }
                        else {
                            pos.x = head.offsetLeft - 20
                            pos.y = head.offsetTop
                            this.record = "left"
                        }
                        break;
                    case "right":
                        if (head.offsetLeft == this.map.clientWidth - 20) {
                            this.cnt++
                        }
                        else {
                            pos.x = head.offsetLeft + 20
                            pos.y = head.offsetTop
                            this.record = "right"
                        }
                        break;
                    case "top":
                        if (head.offsetTop == 0) {
                            this.cnt++
                        }
                        else {
                            pos.x = head.offsetLeft
                            pos.y = head.offsetTop - 20
                            this.record = "top"
                        }
                        break;
                    case "bottom":
                        if (head.offsetTop == this.map.clientHeight - 20) {
                            this.cnt++
                        }
                        else {
                            pos.x = head.offsetLeft
                            pos.y = head.offsetTop + 20
                            this.record = "bottom"
                        }
                        break;

                    default:
                        break;
                }
            }
            else if (this.cnt == 2) {
                switch (this.directhion) {
                    case 1:
                        break;
                    case "left":
                        if (head.offsetLeft == this.map.clientWidth - 20) {
                            this.cnt++
                        }
                        else {
                            pos.x = head.offsetLeft + 20
                            pos.y = head.offsetTop
                            this.record = "right"
                        }
                        break;
                    case "right":
                        if (head.offsetLeft == 0) {
                            this.cnt++
                        }
                        else {
                            pos.x = head.offsetLeft - 20
                            pos.y = head.offsetTop
                            this.record = "left"
                        }
                        break;
                    case "top":
                        if (head.offsetTop == this.map.clientHeight - 20) {
                            this.cnt++
                        }
                        else {
                            pos.x = head.offsetLeft
                            pos.y = head.offsetTop + 20
                            this.record = "bottom"
                        }
                        break;
                    case "bottom":
                        if (head.offsetTop == 0) {
                            this.cnt++
                        }
                        else {
                            pos.x = head.offsetLeft
                            pos.y = head.offsetTop - 20
                            this.record = "top"
                        }
                        break;

                    default:
                        break;
                }

            }

            //需要把原先的蛇头变成身体
            if ((this.cnt == 0 || this.cnt == 2) && this.directhion != 1) {
                head.className = "body"
            }
        }
        if ((this.cnt == 0 || this.cnt == 2) && this.directhion != 1) {

            //创建蛇头
            const div = document.createElement("div")
            //定义样式
            div.className = "head"
            //把蛇头存入数组
            this.snakelist.unshift(div)
            //给蛇头定义坐标
            div.style.left = pos.x + "px"
            div.style.top = pos.y + "px"
            //放在地图当中
            this.map.appendChild(div)
        }

    }
    //创建一条蛇
    creatSnake() {
        for (let i = 0; i < 4; i++) {
            this.createHead()
        }
    }
    //蛇移动的方法
    move() {
        //把原先头部坐标后面增加一个蛇头原先的蛇头变成身体，身体末尾位置删除一个以此来实现视觉上的位移
        if ((this.cnt == 0 || this.cnt == 2) && this.directhion != 1) {
            this.createHead()
            if (this.cnt == 0 || this.cnt == 2) {
                const body = this.snakelist.pop()
                //从页面删除
                body.remove()
            }
            //新增蛇头
            // this.createHead()
        }
    }


    //判断蛇有没有吃到食物
    isEatFood(food_X, food_Y) {
        const head = this.snakelist[0]    //获取蛇头
        const head_X = head.offsetLeft   //获取蛇头的X坐标
        const head_Y = head.offsetTop    //获取蛇头的Y坐标
        //坐标重叠了，吃到了食物
        if (food_X === head_X && food_Y === head_Y) {
            return true
        }
        return false
    }
    //判断蛇有没有吃到零食
    isEatSnacks(snacks_X, snacks_Y) {
        const head = this.snakelist[0]    //获取蛇头
        const head_X = head.offsetLeft   //获取蛇头的X坐标
        const head_Y = head.offsetTop    //获取蛇头的Y坐标
        if (snacks_X === head_X && snacks_Y === head_Y) {
            return true
        }
        return false
    }
    //判断蛇有没有吃到药品
    isEatMedicine(medicine_X, medicine_Y) {
        const head = this.snakelist[0]    //获取蛇头
        const head_X = head.offsetLeft   //获取蛇头的X坐标
        const head_Y = head.offsetTop    //获取蛇头的Y坐标
        if (medicine_X === head_X && medicine_Y === head_Y) {
            return true
        }
        return false
    }


    //判断蛇有没有到边界
    //是否撞墙死亡
    isDie() {
        /*const head = this.snakelist[0]
        const head_X = head.offsetLeft
        const head_Y = head.offsetTop
        console.log(head_X, head_Y);
        if (head_X < 0 || head_Y < 0 || head_X >= this.map.clientWidth || head_Y >= this.map.clientHeight) {
            return true
        }
        return false*/
        if (this.cnt == 3)
            return true
        else
            return false

    }
}