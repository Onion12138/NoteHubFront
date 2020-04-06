<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <img :src="images[item-1]" />
      </el-carousel-item>
    </el-carousel>

    <h2 style="margin: 20px 0 20px 10px;">为你推荐</h2>

    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="(note,index) in notes" :name="index" :key="note.id">
        <template slot="title">
          <el-link type="primary" @click.stop.prevent="linkToNote(note.id)">{{note.description}}</el-link>
        </template>
        <div>{{note.summary|summaryFilter}}</div>
        <el-row
          type="flex"
          justify="space-between"
          style="color:rgb(165,165,165);fontSize:0.8rem;margin-bottom: -15px;"
        >
          <el-col style="textAlign:left">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">发布于 {{ note.createTime }}</span>
          </el-col>
          <el-col style="textAlign:right">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px;textAlign:right">更新于 {{ note.updateTime }}</span>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { timestampFormat } from "@/utils/timeUtils";

export default {
  data() {
    return {
      activeNames: ["0"],
      notes: [
        {
          id: "1586069621787826035",
          createTime: "2020-04-05",
          updateTime: "2020-04-05",
          summary:
            "当确信任务能够处理interrupt时，可以指定Future.cancel(true)，Future.cancel(false)仅⽤于避免启动尚未启 动的任务，适⽤于未能处理中断的任务/不清楚⼈去是否⽀持取消/需要等待已经开始的任务执⾏完成  Future Runnable缺陷- 没有返 回值- ⽆法抛出异常 get结果- 正常完成：返回结果- 尚未完成：阻塞等待完成- 执⾏时抛出异常：抛出ExecutionException- 任务取 消：CancellationException- 超时：TimeoutException 示例多任务抛出异常isDone()返回true超时 取消- 未开始执⾏，返回true- 已经 完成或取消，取消失败，返回false- 已经开始执⾏，会根据参数mayInterruptIfRunning做判断  FutureTask 注意点- ⽤for循环批量获 取结果时容易发⽣⼀部分线程慢的情况，应该使⽤timeout限制- ⽣命周期⽆法后退 为True时会发送中断信号",
          description: "并发编程Future"
        },
        {
          id: "1586165780335434829",
          createTime: "2020-04-06",
          updateTime: "2020-04-06",
          summary:
            "当确信任务能够处理interrupt时，可以指定Future.cancel(true)，Future.cancel(false)仅⽤于避免启动尚未启 动的任务，适⽤于未能处理中断的任务/不清楚⼈去是否⽀持取消/需要等待已经开始的任务执⾏完成 - 已经完成或取消，取消失败， 返回false - 超时：TimeoutException - 未开始执⾏，返回true - 执⾏时抛出异常：抛出ExecutionException",
          description: "并发笔记"
        },
        {
          id: "1586069520763233245",
          createTime: "2020-04-05",
          updateTime: "2020-04-05",
          summary:
            "[0e5c66ea7a071386da467074a3b2d988.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/ appyinxiangcom/23337086/ENResource/p559)signalAll()会唤起所有正在等待的线程signal()唤起等待时间最⻓的 基本⽤法 顺序唤 醒场景：对线程之间按顺序调⽤，实现A>B>C三个线程启动，要求AA打印5次，BB打印10次，CC打印15次，⼀共⼗轮 ⽣产者消费 者 CyclicBarrier和CountDownLatch不同的是，CyclicBarrier可以重复使⽤ [0939fec4d4f11fe3705ed5da9f695ff9.png](evernotecid:// 2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p558) CountDownLatch场景1：⼯⼚中， 质检，5个⼯⼈检查，所有⼈都认为通过，才算通过  并发流程控制 概览  Semaphore Condition 场景2：模拟100⽶跑步，5名选⼿都 准备好了，只等裁判员⼀声令下，所有⼈同时开始跑步",
          description: "Java并发流程控制"
        },
        {
          id: "1586068852824991925",
          createTime: "2020-04-05",
          updateTime: "2020-04-05",
          summary:
            "> 分析以下代码运⾏结果核⼼思路：是否能在编译时被确定 栈封闭在⽅法中新建的局部变量，存储在每个线 程私有的栈空间，不会有线程安全问题  不变性 ﬁnal> 把所有属性声明为ﬁnal是否意味着对象不可变 不⼀定，如果属性本身也是引⽤ 类型，只是引⽤不可变，引⽤对象的属性依然可变",
          description: "并发编程不变性"
        },
        {
          id: "1586069474193886951",
          createTime: "2020-04-05",
          updateTime: "2020-04-05",
          summary:
            " 锁 对⽐sychronize- 原始构成- synchronized时关键字属于jvm- Lock是具体类，是api层⾯的锁（java.util.）- 使⽤⽅法- sychronized不需要⽤户取⼿动释放锁，当synchronized代码执⾏完后系统会⾃动让线程释放对锁的占⽤- ReentrantLock 则需要⽤户去⼿动释放锁若没有主动释放锁，就有可能导致出现死锁现象，需要lock()和unlock()⽅法配合try/ﬁnally语句块来完成- 等 待是否可中断- synchronized不可中断，除⾮抛出异常或者正常运⾏完成- ReentrantLock可中断，设置超时⽅法tryLock(long timeout, TimeUnit unit)，或者lockInterruptibly()放代码块中，调⽤interrupt()⽅法可中断 [efa13e1296b8e725439cd6464a87158d.png] (evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p554)设为true时，则按顺序 ⼀份⼀份打印设为false时，则按顺序打印两份 共享锁与排他锁ReentrantReadWriteLock读锁插队策略公平锁：不允许插队⾮公平 锁：- 写锁可以随时插队- 读锁仅在等待队列头节点不是想获取写锁的线程时可以插队演示读锁插队现象升降级策略：只允许降级， 避免死锁使⽤升降级实现缓存功能下⾯代码中只有⼀处修改数据，⼀直⽤写锁，降低整体效率  ⾃旋锁与阻塞锁引⼊：同步资源锁定 时间短，线程切换开销⼤，所以不切换CPU状态原理：\t`CAS`使⽤场景：多核服务器，并发度不⾼，临界区⽐较短⼩模拟⾃旋锁 可 中断锁synchronized为不可中断锁lock为可中断锁 锁优化JVM- 锁消除- 锁粗化- ⾃旋锁和⾃适应个⼈- 缩⼩同步代码块- 尽量不锁⽅ 法- 减少请求锁次数 lock()不能被中断，⼀旦陷⼊死锁会永久等待使⽤tryLock防⽌死锁lockInterruptibly 乐观锁与悲观锁悲观锁：每次 获取并修改数据时先把数据锁住，对应java中的sychronize和Lock相关类 - 加锁是否公平- synchronized⾮公平锁- ReentrantLock两 者都可以，默认公平锁，构造⽅法可以传⼊boolean值，true为公平锁，false为⾮公平锁- 线程唤醒ReentrantLock⽤来实现分组唤醒 需要要唤醒的线程们，可以精确唤醒，⽽不是像synchronized要么随机唤醒⼀个线程要么唤醒全部线程",
          description: "Java并发⼯具类锁的使⽤"
        },
        {
          id: "1586069132872713516",
          createTime: "2020-04-05",
          updateTime: "2020-04-05",
          summary:
            " 并发容器 ConcurrentHashMap> 将HashMap变为并发安全的⽅法> HashMap并发不安全的原因（了解）链 表扩容时变成循环链表，导致CPU占⽤100%以下问题仅在jdk8以下出现，jdk8底层数据结构已经变为红⿊树> 组合操作不保证线程 安全concurrentHashMap保证多个线程同时get/put的安全解决⽅法：使⽤replace，即注释内代码 copyOnWriteArrayList 场景：读多 写少 读写规则：读取不加锁，写⼊不阻塞读取操作，只有写⼊与写⼊之间需要同步 演示：迭代器 缺点：- 只能保证最终⼀致性- 内 存占⽤，写复制 并发队列 关系图 接⼝⽅法| ⽅法 |异常  |特殊值  |阻塞  |超时  || --- | --- | --- | --- | --- ||插⼊|add(e)|offer(e)| put(e)| offer(e,time,unit)||移除|remove()|poll()|take()|poll(time,unit)||查看|element()|peek()| | | ArrayBlockingQueue场景1：10个⾯试 者，1个⾯试官，3个座位场景2：⽣产者消费者问题",
          description: "Java线程池原理与应⽤"
        },
        {
          id: "1586069842812837424",
          createTime: "2020-04-05",
          updateTime: "2020-04-05",
          summary:
            " 死锁 必要条件- 互斥- 请求与保持- 不剥夺- 循环等待 ⼿写必然死锁 哲学家就餐 ⼯具类检测 Tips- 设置超时时 间 tryLock- 优先使⽤并发类⽽⾮⾃⼰设计- 降低锁使⽤粒度- 避免锁的嵌套- 专锁专⽤ 活锁程序并没有阻塞，但却得不到进展演示：",
          description: "多线程死锁问题"
        }
      ],
      images: [
        "https://img2.mukewang.com/szimg/5e5621d0092c054612000676-360-202.png",
        "https://img2.mukewang.com/szimg/5e6f2f240847796506000338-360-202.jpg",
        "https://img4.mukewang.com/szimg/5d25400a08fa408c06000338-360-202.jpg",
        "https://img3.mukewang.com/szimg/5e6b4ede09bc3b4412000676-360-202.png",
        "https://img3.mukewang.com/szimg/5e3cfea008e9a61b06000338-360-202.jpg",
        "https://img4.mukewang.com/szimg/5e54bebe087fe86d06000338-360-202.jpg"
      ]
    };
  },
  filters: {
    summaryFilter(summary) {
      return summary.slice(0, 100);
    },
    timeFilter(time) {
      return timestampFormat(time);
    }
  },
  methods: {
    linkToNote(noteId) {
      this.$router.push("/note/" + noteId);
    }
  }
};
</script>

<style scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
img {
  width: 100%;
  min-height: 200px;
  min-width: 260px;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>