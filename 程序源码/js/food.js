//food类的定义
//食物的操作
//1坐标位置
//2生成食物
//3更新
//食物，零食，药品

//食物
class Food {
    constructor(select) {
        this.map = document.querySelector(select)

        //创建食物
        this.food = document.createElement('div')
        //定义样式
        this.food.className = "food"
        //放在地图中间
        this.map.appendChild(this.food)
        //定义坐标
        this.x = 0
        this.y = 0
        //调用生成事物的方法
        this.foodPos()
    }
    //所及坐标点
    foodPos() {
        //1.拿到地图范围
        // console.log(this.map.clientWidth / 20);//获取宽度
        // console.log(this.map.clientHeight / 20);//获取高度
        const w_nub = this.map.clientWidth / 20
        const h_nub = 30

        //2.随机生成数字
        let n1 = Math.floor(Math.random() * w_nub)
        let n2 = Math.floor(Math.random() * h_nub)
        //3.根据随机数坐标位置的计算
        this.x = n1 * 20
        this.y = n2 * 20
        //4.赋值
        this.food.style.left = this.x + "px"
        this.food.style.top = this.y + "px"

    }
}
//零食
class Snacks {
    constructor(select) {
        this.map = document.querySelector(select)

        //创建食物
        this.snacks = document.createElement('div')
        //定义样式
        this.snacks.className = "snacks"
        //放在地图中间
        this.map.appendChild(this.snacks)
        //定义坐标
        this.x = 0
        this.y = 0
        //调用生成事物的方法
        this.snacksPos()
    }
    //所及坐标点
    snacksPos() {
        //1.拿到地图范围
        // console.log(this.map.clientWidth / 20);//获取宽度
        // console.log(this.map.clientHeight / 20);//获取高度
        const w_nub = this.map.clientWidth / 20
        const h_nub = 30

        //2.随机生成数字
        let n1 = Math.floor(Math.random() * w_nub)
        let n2 = Math.floor(Math.random() * h_nub)
        console.log(n1, this.map.clienHeight);

        //3.根据随机数坐标位置的计算
        this.x = n1 * 20
        this.y = n2 * 20
        //4.赋值
        this.snacks.style.left = this.x + "px"
        this.snacks.style.top = this.y + "px"

    }
}
//药品
class Medicine {
    constructor(select) {
        this.map = document.querySelector(select)
        //创建食物
        this.medicine = document.createElement('div')
        //定义样式
        this.medicine.className = "medicine"
        //放在地图中间
        this.map.appendChild(this.medicine)
        //定义坐标
        this.x = 0
        this.y = 0
        //调用生成事物的方法
        this.medicinePos()
    }
    //所及坐标点
    medicinePos() {
        //1.拿到地图范围
        // console.log(this.map.clientWidth / 20);//获取宽度
        // console.log(this.map.clientHeight / 20);//获取高度
        const w_nub = this.map.clientWidth / 20
        const h_nub = 30

        //2.随机生成数字
        let n1 = Math.floor(Math.random() * w_nub)
        let n2 = Math.floor(Math.random() * h_nub)
        console.log(n1, this.map.clienHeight);

        //3.根据随机数坐标位置的计算
        this.x = n1 * 20
        this.y = n2 * 20
        //4.赋值
        this.medicine.style.left = this.x + "px"
        this.medicine.style.top = this.y + "px"

    }
}