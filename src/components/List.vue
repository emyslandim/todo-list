<template>
  <div>
    <header>
      <h1>TO-DO LIST</h1>
    </header>
    <main class="main">
      <div class="form">
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

      <div class="container-table-activities">
        <div v-if="isEmpty" class="empty-alert">
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

      <div class="information">
        <div class="box-information">
          <span>completed:</span>
          <span>{{completed}}</span>
        </div>
        <div class="box-information">
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

<style scoped>
.main {
  display: grid;
  grid-template-columns: 0.3fr;
  justify-content: center;
  align-content: center;
  gap: 1rem;
}

.form {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: #fff;
  padding: 1rem;
  gap: 0.5rem;
  border-radius: 0.2rem;
}

.input-text {
  line-height: 1.5rem;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
}

.button {
  border: 0;
  padding: 0.5rem;
  background-color: #ee6e73;
  color: #fff;
  border-radius: 0.2rem;
}

.button:hover {
  cursor: pointer;
  background-color: #ff9ea1;
}

.container-table-activities {
  background-color: #fff;
  padding: 1rem;
  min-height: 6rem;
  display: grid;
  border-radius: 0.2rem;
}

.table-activities {
  border-collapse: collapse;
}

.information {
  background-color: #fff;
  color: #9b9b9b;
  font-weight: bold;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0.5rem;
  border-radius: 0.2rem;
}

.box-information {
  justify-content: center;
  display: grid;
  grid-row: auto;
}

.error-alert {
  color: rgb(216, 125, 125);
  display: grid;
  grid-column: span 3;
  justify-items: center;
  background-color: rgba(216, 125, 125, 0.329);
  padding: 0.5rem;
  border-radius: 0.2rem;
}

.empty-alert {
  color: rgb(216, 125, 125);
  display: grid;
  grid-column: span 3;
  justify-items: center;
  align-self: center;
  background-color: rgba(216, 125, 125, 0.329);
  padding: 0.5rem;
  border-radius: 0.2rem;
}

.pendent {
  color: rgb(216, 125, 125);
  font-weight: bold;
}

.completed {
  color: rgb(140, 216, 125) !important;
  font-weight: bold;
  text-decoration: line-through;
}
</style>
