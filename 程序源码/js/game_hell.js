class Game {
    constructor(select, scoreEle, gameoverrbg) {
        this.startbtn = document.querySelector("#start")
        this.gameoverimg = document.querySelector(gameoverrbg)
        //地图
        this.map = document.querySelector(select)
        //计分板
        this.scoreEle = document.querySelector(scoreEle)
        //食物
        this.food = new Food(select)
        //零食
        this.snacks = new Snacks(select)
        //药物
        this.medicine = new Medicine(select)
        //蛇
        this.snake = new Snake(select)
        //定义计时器___这个是 setInterval 的标志
        this.timer = 0
        this.timer2 = 0
        this.timer3 = 0
        //得分
        this.count = 0
        //连续吃食物的次数
        this.food_cnt = 0        //吃食物
        this.food_cnt_no = 0    //连续吃食物
        //连续吃零食的次数
        this.snacks_cnt = 0     //吃零食，还充当了buff1的判断条件
        this.snacks_cnt_no = 0  //连续吃零食
        //连续吃药品的次数
        this.medicine_cnt_no = 0
        //3秒间隔刷新食物
        this.food_refresh = 0
        this.snacks_refresh = 0
        //进食时间，就是连续三次，超过5秒进食，就会死
        this.eat_times = 0    //计算次数
        this.eat_time = 0     //计算时间,也是标志对应的setInterval函数
        //标志生长缓慢BUFF_2
        this.buff2 = 0
        //计时
        this.gameTime = new Date().getTime()
        //蛇的运行速度
        this.setInterval = 50
        this.setInterval_record = 50
        this.buall = 0 //辅助判断变量
        this.ball = 0
        this.isRunning1 = false // 初始状态为未执行
    }
    //定义游戏开始的方法
    start() {

        if (!this.isRunning) {
            this.isRunning = true// 设置为执行状态
            this.gameoverimg.style.display = "none"
            //间隔3秒刷新食物和零食
            this.food_refresh = setInterval(() => {
                this.food.foodPos();
            }, 3000);
            this.snacks_refresh = setInterval(() => {
                this.snacks.snacksPos();
            }, 3000);
            //计算5秒内，没吃到食物(做了修改)
            this.eat_time = setInterval(() => {
                this.food_cnt = 0
                this.food_cnt_no = 0
                this.snacks_cnt = 0
                this.snacks_cnt_no = 0
                this.buff2 = 1
                this.eat_times++
            }, 100000);
            //蛇的运动
            const move = () => {
                // 在这里定义 move 方法的具体实现
                // 可以访问到 start() 方法中的其他变量和属性
                // 执行蛇的运动逻辑
                //控制蛇的自主移动
                if (this.snake.cnt == 0 || this.snake.cnt == 2) {
                    this.snake.move()
                }
                if (this.snake.cnt == 1) {
                    //撞墙后速度减慢
                    this.snake.directhion = 1
                    this.snake.cnt = 2
                    this.buall = 1
                    this.buall2 = 1
                    clearInterval(this.timer)
                    this.setInterval_record = this.setInterval
                    this.setInterval = this.setInterval * 3
                    this.timer = null
                    this.isRunning = false
                    // this.timer = setInterval(this.move(), this.setInterval)
                    this.clearAllTimer(); // 清除所有定时器
                    this.start(); // 重新开始游戏
                }
                //20秒后方向恢复正常
                if (this.snake.cnt == 2) {
                    if (this.snacks_cnt == 2 && this.buall == 1) {
                        this.buall = 0
                        setTimeout(() => {
                            this.snake.cnt = 0
                            if (this.snake.directhion === "left") {
                                this.snake.directhion = "right"
                            }
                            else if (this.snake.directhion === "right") {
                                this.snake.directhion = "left"
                            }
                            else if (this.snake.directhion === "top") {
                                this.snake.directhion = "bottom"
                            }
                            else if (this.snake.directhion === "bottom") {
                                this.snake.directhion = "top"
                            }
                        }, 20000);
                    }
                }
                //三秒后速度恢复正常
                if (this.setInterval_record == this.setInterval / 3 && this.buall2 == 1) {
                    this.buall2 = 0
                    this.timer3 = setTimeout(() => {

                        clearInterval(this.timer)
                        this.setInterval = this.setInterval_record
                        this.timer = null
                        this.isRunning = false
                        this.clearAllTimer(); // 清除所有定时器
                        this.start(); // 重新开始游戏
                    }, 3000)
                }
                //连续三次，吃到食物的时间超过5秒，那就死了
                if (this.eat_times === 3) {
                    clearInterval(this.timer)
                    this.gameover()
                }
                //判断是否吃到食物
                if (this.snake.isEatFood(this.food.x, this.food.y)) {
                    //吃到食物，就算连续吃到食物记数就 ++
                    this.food_cnt++
                    this.food_cnt_no++
                    //食物位置更新
                    this.food.foodPos()
                    //连续吃零食，药品，刷新
                    this.snacks_cnt_no = 0
                    this.medicine_cnt_no = 0
                    if (this.food_cnt_no == 3 && this.snacks.cnt == 2) {
                        this.snake.cnt = 0
                        //对方向的更新
                        if (this.snake.directhion === "left") {
                            this.snake.directhion = "right"
                        }
                        else if (this.snake.directhion === "right") {
                            this.snake.directhion = "left"
                        }
                        else if (this.snake.directhion === "top") {
                            this.snake.directhion = "bottom"
                        }
                        else if (this.snake.directhion === "bottom") {
                            this.snake.directhion = "top"
                        }
                    }
                    //连续吃4次正向食物，恢复正常，中间不可以吃零食
                    if (this.food_cnt_no === 4) this.buff2 = 0

                    //在BUFF2的条件下
                    if (this.buff2 === 1) {
                        //吃两个食物，才能长大一格
                        if (this.food_cnt % 2 === 0) {
                            this.snake.createHead();
                            this.scorechange();
                        }
                    }
                    //连吃食物，18次，之后再吃，就是一次增加4个
                    else if (this.food_cnt >= 18) {
                        //重新开始timer函数，并且调节速度，使得蛇爬的变快
                        if (this.food_cnt === 18) {
                            clearInterval(this.timer)
                            this.setInterval = this.setInterval - 10
                            this.timer = null
                            this.clearAllTimer(); // 清除所有定时器
                            this.start(); // 重新开始游戏
                        }
                        //增长蛇的长度，得分
                        for (let i = 0; i < 4; i++) {
                            this.snake.createHead(); this.scorechange();
                        }
                    }
                    else if (this.food_cnt >= 12) {
                        //重新开始timer函数，并且调节速度，使得蛇爬的变快
                        if (this.food_cnt === 12) {
                            clearInterval(this.timer)
                            this.setInterval = this.setInterval - 20
                            this.timer = null
                            this.clearAllTimer(); // 清除所有定时器
                            this.start(); // 重新开始游戏
                        }
                        //增长蛇的长度，得分
                        for (let i = 0; i < 3; i++) {
                            this.snake.createHead(); this.scorechange();
                        }
                    }
                    else if (this.food_cnt >= 6) {
                        //重新开始timer函数，并且调节速度，使得蛇爬的变快
                        if (this.food_cnt === 6) {
                            clearInterval(this.timer)
                            this.setInterval = this.setInterval - 5
                            this.timer = null
                            this.clearAllTimer(); // 清除所有定时器
                            this.start(); // 重新开始游戏
                        }
                        //增长蛇的长度，得分
                        for (let i = 0; i < 2; i++) {
                            this.snake.createHead(); this.scorechange();
                        }
                    }
                    else {
                        this.snake.createHead();
                        this.scorechange();
                    }
                    this.food_cnt > 0 && (this.food_num = this.food_cnt)
                    //吃到食物，就把连续三次进食超过5秒，死亡的那个重置
                    this.eat_times = 0
                    clearInterval(this.eat_time)
                    this.eat_time = null
                    this.eat_time = setInterval(() => {
                        this.food_cnt = 0
                        this.food_cnt_no = 0
                        this.snacks_cnt = 0
                        this.snacks_cnt_no = 0
                        this.buff2 = 1
                        this.eat_times++
                    }, 5000);

                    //吃到食物，那么3秒没吃到刷新食物的那个函数就要重启
                    clearInterval(this.food_refresh)
                    this.food_refresh = null
                    this.food_refresh = setInterval(() => {
                        this.food.foodPos();
                    }, 3000);
                    //连续吃两次食物，就会把吃零食的那个BUFF给抵消掉
                    if (this.food_cnt_no === 2) this.snacks_cnt = 0;
                }

                //判断是否吃到零食
                if (this.snake.isEatSnacks(this.snacks.x, this.snacks.y)) {
                    //吃零食,零食次数++
                    this.snacks_cnt++
                    this.snacks_cnt_no++
                    //零食位置更新
                    this.snacks.snacksPos()
                    //连续吃食物，药品，刷新
                    this.food_cnt_no = 0
                    this.medicine_cnt_no = 0
                    //不间断吃三次零食，就把连吃食物的那个增益消除掉
                    if (this.snacks_cnt_no === 3) this.food_cnt = 0;


                    //吃到零食，就把连续三次进食超过5秒，死亡的那个重置
                    this.eat_times = 0
                    clearInterval(this.eat_time)
                    this.eat_time = null
                    this.eat_time = setInterval(() => {
                        this.food_cnt = 0
                        this.food_cnt_no = 0
                        this.snacks_cnt = 0
                        this.snacks_cnt_no = 0
                        this.buff2 = 1
                        this.eat_times++
                    }, 5000);

                    //吃到零食，那么3秒没吃到刷新零食的那个函数就要重启
                    clearInterval(this.snacks_refresh)
                    this.snacks_refresh = null
                    this.snacks_refresh = setInterval(() => {
                        this.snacks.snacksPos();
                    }, 3000);



                    //在BUFF2下，吃零食不会长大，就什么都不干
                    if (this.buff2 === 1);
                    //吃零食2次，长大1格
                    else if (this.snacks_cnt === 2) {
                        this.snake.createHead(); this.scorechange();
                    }
                    //吃零食3次，长大2格
                    else if (this.snacks_cnt === 3) {
                        for (let i = 0; i < 2; i++) {
                            this.snake.createHead(); this.scorechange();
                        }
                    }
                    //吃零食6次，长大3格
                    else if (this.snacks_cnt === 6) {
                        for (let i = 0; i < 3; i++) {
                            this.snake.createHead(); this.scorechange();
                        }
                    }
                    //吃零食10次，长大4格
                    else if (this.snacks_cnt === 10) {
                        for (let i = 0; i < 4; i++) {
                            this.snake.createHead(); this.scorechange();
                        }
                    }
                    //吃零食15次，长大5格
                    else if (this.snacks_cnt === 15) {
                        for (let i = 0; i < 5; i++) {
                            this.snake.createHead(); this.scorechange();
                        }
                    }
                    //吃零食21次，长大6格
                    else if (this.snacks_cnt === 21) {
                        for (let i = 0; i < 6; i++) {
                            this.snake.createHead(); this.scorechange();
                        }
                    }
                }
                //判断是否吃到药品
                if (this.snake.isEatMedicine(this.medicine.x, this.medicine.y)) {
                    //随便吃什么，那两个判断连续吃一样的，都得刷新
                    this.food_cnt_no = 0
                    this.snacks_cnt_no = 0
                    //吃药可以缓解增长缓慢的BUFF_1
                    this.snacks_cnt = 0
                    //吃药可以缓解增长缓慢的BUFF_2
                    this.buff2 = 0
                    //吃药缓解眩晕状态
                    if (this.snake.cnt != 0) {
                        this.snake.cnt = 0
                        //对方向的更新
                        if (this.snake.directhion === "left") {
                            this.snake.directhion = "right"
                        }
                        else if (this.snake.directhion === "right") {
                            this.snake.directhion = "left"
                        }
                        else if (this.snake.directhion === "top") {
                            this.snake.directhion = "bottom"
                        }
                        else if (this.snake.directhion === "bottom") {
                            this.snake.directhion = "top"
                        }
                    }
                    //连续吃药 ++
                    this.medicine_cnt_no++
                    //药品位置更新
                    this.medicine.medicinePos()
                    //连续吃药两次，直接 死了
                    if (this.medicine_cnt_no === 2) {
                        clearInterval(this.timer);
                        this.gameover();
                    }

                }

                //判断是否撞墙，直接死了
                if (this.snake.isDie()) {
                    this.isHitWall = true; // 设置为撞墙状态
                    clearInterval(this.food_refresh);
                    clearInterval(this.snacks_refresh);
                    clearInterval(this.eat_time);
                    clearInterval(this.timer);
                    this.gameover();
                }
            };
            this.timer = setInterval(() => {

                move()

            }, this.setInterval);    //这里的就是蛇运动的速度,越小越快

        }
    }
    //删除所有定时器
    clearAllTimer() {
        clearInterval(this.food_refresh)
        clearInterval(this.snacks_refresh)
        clearInterval(this.eat_time)
        clearInterval(this.timer)
    }


    //暂停
    pause() {
        clearInterval(this.timer)
    }
    //重新开始
    restart() {
        this.startbtn.disabled = false
        window.location.reload()
    }
    //改变方向
    change(type) {
        //对撞墙后下一步操作的修改
        if (this.snake.directhion == 1) {
            if (this.snake.record === "left" && type === "left");  //什么都不做
            else if (this.snake.record === "right" && type === "right");//什么都不做
            else if (this.snake.record === "bottom" && type === "bottom");//什么都不做
            else if (this.snake.record === "top" && type === "top");//什么都不做
            else this.snake.directhion = type;
        }
        else {
            if (this.snake.directhion === "left" && type === "right");  //什么都不做
            else if (this.snake.directhion === "right" && type === "left");//什么都不做
            else if (this.snake.directhion === "bottom" && type === "top");//什么都不做
            else if (this.snake.directhion === "top" && type === "bottom");//什么都不做
            else this.snake.directhion = type;
        }
    }
    //得分增加
    scorechange() {
        //得分增加
        this.count++
        this.scoreEle.innerText = this.count
    }
    //游戏结束
    async gameover() {
        //禁用开始按钮
        this.startbtn.disabled = true
        const endTime = new Date().getTime()
        let dieImg = await this.getOverImg()
        let type = document.querySelector('title').innerText
        let gameObj = {
            startTime: this.gameTime,
            endTime,
            gameTime: endTime - this.gameTime,
            count: this.count,
            food: this.food_num || 0,
            dieImg,
            type
        }

        let gameData = localStorage.getItem('gameData') || {
            [type]: []
        }
        if (localStorage.getItem('gameData')) gameData = JSON.parse(gameData)

        if (!gameData[type]) gameData[type] = []
        if (gameData[type].length >= 30) {
            gameData[type].splice(0, 1)
        }
        gameData[type].push(gameObj)

        localStorage.setItem("gameData", JSON.stringify(gameData))

        this.clearAllTimer()
        this.gameoverimg.style.display = "block"
    }
    getOverImg() {
        let body = document.body
        let head = document.querySelector('.head')
        let bodys = document.querySelector('.body')
        let box = this.map

        let x = box.offsetLeft + bodys.offsetLeft - 50 //+ 20
        let y = box.offsetTop + bodys.offsetTop - 20 //+ 20
        let w = head.offsetLeft - bodys.offsetLeft + 40 + 100, h = 150
        return new html2canvas(body,
            {
                allowTaint: true,
                useCORS: true,
                backgroundColor: 'transparent',
                scale: 1,
                width: body.clientWidth,
                height: body.clientHeight
            }).then(canvas => {
                //创建新的 cavans 截取
                let new_canvas = document.createElement('canvas');
                new_canvas.width = w;
                new_canvas.height = h;
                let context = new_canvas.getContext('2d');
                context.drawImage(canvas, x, y, w, h, 0, 0, w, h);
                let dataURL = new_canvas.toDataURL("image/jpeg");
                return dataURL
            });
    }

}
