<template>
  <div>
    <header>
      <h1>TO-DO LIST</h1>
    </header>
    <main>
      <div class="box form">
        <div>
          <input
            placeholder="activity"
            class="input-text"
            type="text"
            id="input-name"
            v-model="activity"
          />
        </div>
        <div>
          <input class="input-text" type="date" id="input-date" v-model="date" />
        </div>
        <div>
          <button class="button" @click="validateActivity()">ADD</button>
        </div>
        <div v-if="errorForm" class="error-alert">
          <span>an error happened, please try again</span>
        </div>
      </div>

      <div class="box container-table-activities">
        <div v-if="isEmpty" class="error-alert">
          <span>No activities yet</span>
        </div>
        <table v-else class="table-activities">
          <tr
            v-for="item in activities"
            :key="item.id"
            :class="item.completed === true ? 'completed' : 'pendent'"
          >
            <td>{{item.name}}</td>
            <td>{{getDate(item.date)}}</td>
            <td>
              <button class="button" type="text" @click="removeActivity(item.id)">Remove</button>
            </td>
            <td>
              <input
                type="checkbox"
                @click="completeActivity(item.id)"
                :checked="item.completed === true ? true : false"
              />
            </td>
          </tr>
        </table>
      </div>

      <div class="box information">
        <div class="items-information">
          <span>completed:</span>
          <span>{{completed}}</span>
        </div>
        <div class="items-information">
          <span>total:</span>
          <span>{{total}}</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { v4 as uuid } from "uuid";
import moment from "moment";

export default {
  name: "List",
  data() {
    return {
      activity: "",
      date: "",
      errorForm: false
    };
  },
  methods: {
    ...mapActions(["addActivity", "deleteActivity", "finishedActivity"]),
    validateActivity() {
      if (this.activity !== "" && this.date !== "") {
        const activity = {
          name: this.activity,
          date: this.date,
          completed: false,
          id: uuid()
        };

        this.addActivity(activity);
        this.activity = "";
        this.date = "";
        this.errorForm = false;
      } else {
        this.errorForm = true;
      }
    },
    removeActivity(item) {
      this.deleteActivity(item);
    },
    completeActivity(item) {
      this.finishedActivity(item);
    },
    getDate(item) {
      return moment(item).format("DD/MM/YYYY");
    }
  },
  computed: {
    ...mapGetters({
      activities: "getActivities"
    }),
    isEmpty() {
      return this.activities.length === 0;
    },
    completed() {
      return this.activities.filter(item => item.completed === true).length;
    },
    total() {
      return this.activities.length;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/box.scss';
@import '../scss/error_alert.scss';
@import '../scss/button.scss';
@import '../scss/input.scss';

header{
  text-align: center;
}

main {
  display: grid;
  grid-template-columns: 0.3fr;
  justify-content: center;
  gap: 1rem;
}

.form {
  grid-template-columns: repeat(3, 1fr);
}

.container-table-activities {
  min-height: 6rem;
  .table-activities {
    border-collapse: collapse;
  }
}

.information {
  color: $second-color;
  font-weight: bold;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  .items-information {
    justify-items: center;
    display: grid;
    grid-row: auto;
    gap: 0.2rem;
  }
}

.pendent {
  color: $primary-color;
  font-weight: bold;
}

.completed {
  color: rgb(140, 216, 125) !important;
  font-weight: bold;
  text-decoration: line-through;
}
</style>
