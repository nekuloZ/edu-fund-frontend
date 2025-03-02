<template>
  <div class="dashboard">
    <!-- 数据卡片区域 -->
    <div class="data-cards">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="data-card unresolved">
            <div class="card-header">
              <span>待处理申请</span>
            </div>
            <div class="card-value">60</div>
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card class="data-card overdue">
            <div class="card-header">
              <span>逾期项目</span>
            </div>
            <div class="card-value">16</div>
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card class="data-card active">
            <div class="card-header">
              <span>进行中</span>
            </div>
            <div class="card-value">43</div>
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card class="data-card on-hold">
            <div class="card-header">
              <span>已暂停</span>
            </div>
            <div class="card-value">64</div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 图表区域 -->
    <div class="chart-container">
      <el-card class="chart-card">
        <template #header>
          <div class="chart-header">
            <span>申请处理趋势</span>
            <div class="time-info">更新于：{{ currentTime }}</div>
          </div>
        </template>
        <div class="chart-content">
          <!-- 使用占位图替代 chart.png -->
          <div class="chart-placeholder">
            <img
              src="https://placeholder.im/600x300?text=Chart"
              alt="Chart"
              class="chart-image"
            />
          </div>
        </div>
      </el-card>
    </div>

    <!-- 统计指标行 -->
    <el-row :gutter="20" class="statistics-row">
      <el-col :span="6">
        <el-card class="statistic-card">
          <div class="statistic-title">已解决</div>
          <div class="statistic-value">449</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="statistic-card">
          <div class="statistic-title">已接收</div>
          <div class="statistic-value">426</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="statistic-card">
          <div class="statistic-title">首次响应时间</div>
          <div class="statistic-value">33m</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="statistic-card">
          <div class="statistic-title">平均响应时间</div>
          <div class="statistic-value">3h 8m</div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 性能指标卡 -->
    <el-card class="performance-card">
      <div class="performance-title">SLA 执行情况</div>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="performance-item">
            <div class="item-label">解决率</div>
            <el-progress :percentage="94" :format="format" />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="performance-item">
            <div class="item-label">响应率</div>
            <el-progress :percentage="87" :format="format" />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="performance-item">
            <div class="item-label">满意度</div>
            <el-progress :percentage="96" :format="format" />
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// 格式化进度条显示
const format = (percentage: number) => {
  return percentage + "%";
};

// 格式化当前时间
const currentTime = computed(() => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute}`;
});
</script>

<style scoped lang="scss">
.dashboard {
  .data-cards {
    margin-bottom: 20px;

    .data-card {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition:
        transform 0.3s,
        box-shadow 0.3s;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      }

      .card-header {
        font-size: 16px;
        color: #606266;
        padding: 15px;
        border-bottom: 1px solid #f0f0f0;
      }

      .card-value {
        font-size: 48px;
        font-weight: bold;
        padding: 20px 15px;
        text-align: center;
      }

      &.unresolved {
        .card-value {
          color: #606266;
        }
      }

      &.overdue {
        .card-value {
          color: #f56c6c;
        }
      }

      &.active {
        .card-value {
          color: #67c23a;
        }
      }

      &.on-hold {
        .card-value {
          color: #e6a23c;
        }
      }
    }
  }

  .chart-container {
    margin-bottom: 20px;

    .chart-card {
      border-radius: 8px;
      overflow: hidden;

      .chart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          font-size: 16px;
          font-weight: bold;
          color: #303133;
        }

        .time-info {
          font-size: 12px;
          color: #909399;
        }
      }

      .chart-content {
        padding: 20px 0;
        height: 300px;

        .chart-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          .chart-image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
        }
      }
    }
  }

  .statistics-row {
    margin-bottom: 20px;

    .statistic-card {
      text-align: center;
      border-radius: 8px;
      padding: 10px;

      .statistic-title {
        font-size: 14px;
        color: #909399;
        margin-bottom: 10px;
      }

      .statistic-value {
        font-size: 24px;
        font-weight: bold;
        color: #303133;
      }
    }
  }

  .performance-card {
    border-radius: 8px;
    padding: 20px;

    .performance-title {
      font-size: 16px;
      margin-bottom: 15px;
      color: #303133;
    }
  }
}
</style> 