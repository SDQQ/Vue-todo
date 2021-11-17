<template>
  <transition name="show-form">
      <form v-if="toggle" class="card" @submit.prevent="submit">
        <h1>Создать новую задачу</h1>
        <button type="button" class="btn primary test" @click="createTestTask">Создать тестовую тему</button>
        <div class="form-control">
          <label for="title">Название</label>
          <input type="text" id="title" v-model="title">
        </div>

        <div class="form-control">
          <label for="date">Дата дэдлайна</label>
          <input type="date" id="date" v-model="deadline">
        </div>

        <div class="form-control">
          <label for="description">Описание</label>
          <textarea id="description" v-model="text"></textarea>
        </div>
        <button class="btn primary" type="submit" :disabled="checkFields">Создать</button>
      </form>
  </transition>
</template>


<script>
import {v4 as uuidv4} from 'uuid';
import {useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import taskReq from "../request/taskRequests";
import formatDate from "../utils/formateDate";
import {LoremIpsum} from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

// lorem.generateWords(1);
// lorem.generateSentences(5);
// lorem.generateParagraphs(7);

export default {
  setup(props, context) {
    const toggle = ref(false)
    const title = ref('')
    const deadline = ref('')
    const text = ref('')
    const router = useRouter()

    const checkFields = computed(() => {
      return (!title.value || !deadline.value || !text.value);

    })
    onMounted(() => toggle.value = !toggle.value)

    function createTestTask() {
      submit(null, {
        id: uuidv4(),
        title: lorem.generateSentences(2),
        deadline: '15-08-2030',
        text: lorem.generateParagraphs(4),
        status: 'active',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString().split(':').slice(0, 2).join(':'),
        timeStamp: Date.now()
      })
    }

    async function submit(_, data = undefined) {
      let payload
      if (!data) {
        payload = {
          id: uuidv4(),
          title: title.value,
          deadline: formatDate(deadline.value),
          text: text.value,
          status: 'active',
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString().split(':').slice(0, 2).join(':'),
          timeStamp: Date.now()
        }
      } else {
        payload = data
      }
      const res = await taskReq.setTask(payload)
      if (res) {
        router.push('/tasks')
      }
    }


    return {
      title,
      deadline,
      text,
      submit,
      checkFields,
      createTestTask,
      toggle
    }
  }
}
</script>

<style scoped>
.test {
  margin-bottom: 10px;
}

.show-form-enter-from {
  opacity: 0;
}

.show-form-enter-active {
  transition: all 1s ease;
}

.show-form-enter-to {
  opacity: 1;
}

.show-from-leave-active {
  opacity: 1;
  transition: 1s all;
}

.show-form-leave-to {
  opacity: 0;
}

</style>