import AssignmentList from "./AssignmentList.js";
import AssignmentCreate from "./AssignmentCreate.js";
export default {
  components: { AssignmentList, AssignmentCreate },
  template: `
  <section class="flex gap-8">
    <assignment-list :assignments="filters.inProgress" title="In Progress">
    <assignment-create @add="add"></assignment-create>
    </assignment-list>

    <div v-show ="showCompleted">
    <assignment-list :assignments="filters.completed" title="Completed" can-toggle @toggle="showCompleted = !showCompleted"></assignment-list>
    </div>
<!--this parent component listen to the @add event and it then calls his method-->
<!--The parent communicate to the child through props-->
<!--The child communicate back to the parent by emitting an event-->
    
  </section>
  `,

  data() {
    return {
      assignments: [],
      showCompleted: true,
    };
  },

  computed: {
    filters() {
      return {
        inProgress: this.assignments.filter(
          (assignment) => !assignment.complete
        ),
        completed: this.assignments.filter((assignment) => assignment.complete),
      };
    },
  },

  created() {
    // A Promise is literaly a promise to give you response but it doesn't have anything for you right now

    fetch("http://localhost:3001/assignments") // return a Promise to give me this data
      .then((response) => response.json()) // I promise to give you a json but not right away;
      .then((assignments) => {
        this.assignments = assignments;
      }); // When you have my data, then console.log the data
  },

  methods: {
    add(name) {
      this.assignments.push({
        name: name,
        completed: false,
        id: this.assignments.length + 1,
      });
    },
  },
};
