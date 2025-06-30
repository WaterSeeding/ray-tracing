// 标记此组件为客户端组件
"use client";

// 导入样式模块
import styles from "./styles.module.css";
// 导入 React 的 useEffect 钩子
import { useEffect } from "react";
import GUI from "lil-gui";

/**
 * 主应用组件，负责初始化画布并绘制图像
 */
function App() {
  // 组件挂载后执行的useEffect函数
  useEffect(() => {
    // 获取画布元素
    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    // 获取 2D 绘图上下文
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    // 设置画布宽度，减去 500 像素
    canvas.width = canvas.parentElement!.clientWidth - 10 * 50;
    // 设置画布高度，减去 500 像素
    canvas.height = canvas.parentElement!.clientHeight - 10 * 50;
    // 打印画布的宽度
    console.log("[canvas.width]:", canvas.width);
    // 打印画布的高度
    console.log("[canvas.height]:", canvas.height);
    // 调用绘制图像的函数
    drawImage(ctx, canvas.width, canvas.height, 1, 10);

    const gui = new GUI();
    const guiObject = {
      pixelSize: 1,
      fillRectSize: "10",
    };

    gui
      .add(guiObject, "pixelSize", [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "20",
        "30",
        "40",
        "50",
        "60",
        "70",
        "80",
        "90",
        "100",
      ])
      .name("pixelSize")
      .onChange(() => {
        console.log("[guiObject]", guiObject);
        drawImage(
          ctx,
          canvas.width,
          canvas.height,
          Number(guiObject.pixelSize),
          Number(guiObject.fillRectSize)
        );
      });

    gui
      .add(guiObject, "fillRectSize", [
        "0.1",
        "0.2",
        "0.3",
        "0.4",
        "0.5",
        "0.6",
        "0.7",
        "0.8",
        "0.9",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "20",
        "30",
        "40",
        "50",
        "60",
        "70",
        "80",
        "90",
        "100",
      ])
      .name("size")
      .onChange(() => {
        console.log("[guiObject]", guiObject);
        drawImage(
          ctx,
          canvas.width,
          canvas.height,
          Number(guiObject.pixelSize),
          Number(guiObject.fillRectSize)
        );
      });
  }, []);

  /**
   * 在画布上绘制图像的函数
   * @param ctx - 2D 绘图上下文
   * @param canvasWidth - 画布宽度
   * @param canvasHeight - 画布高度
   * @param pixelSize - 像素大小
   */
  const drawImage = (
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    pixelSize: number,
    fillRectSize: number
  ) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // 从画布底部开始，逐行绘制
    for (let j = canvasHeight - 1; j > 0; j -= pixelSize) {
      // 从左到右，逐列绘制
      for (let i = 0; i < canvasWidth; i += pixelSize) {
        // 计算红色通道值
        let r = i / canvasWidth; // 缩放控制在0 - 1
        // 计算绿色通道值
        let g = j / canvasHeight; // 缩放控制在0 - 1
        // 固定蓝色通道值
        let b = 0.25;
        // 将颜色值转换为 0 - 255 范围
        let ir = 255.0 * r;
        let ig = 255.0 * g;
        let ib = 255.0 * b;
        ctx.fillStyle = `rgba(${ir}, ${ig}, ${ib}, 1)`;
        // 在画布的 (i, j) 位置绘制一个宽度和高度均为 10 像素的填充矩形，填充颜色由之前设置的 ctx.fillStyle 决定
        // ctx.fillRect(i, j, 1, 1);
        ctx.fillRect(i, j, fillRectSize, fillRectSize);
      }
    }
  };

  // 返回画布元素
  return <canvas id="myCanvas" />;
}

// 默认导出一个函数组件，包裹 App 组件并应用样式
export default () => {
  return (
    <div className={styles.main}>
      <App />
    </div>
  );
};
