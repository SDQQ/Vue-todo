<template>
  <form class="card" @submit.prevent="submit">
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
</template>


<script>
import {v4 as uuidv4} from 'uuid';
import {useRouter} from "vue-router";
import {computed, ref} from "vue";
import taskReq from "../request/taskRequests";
import formatDate from "../utils/formateDate";
import { LoremIpsum } from "lorem-ipsum";

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
  setup() {

    const title = ref('')
    const deadline = ref('')
    const text = ref('')
    const router = useRouter()

    const checkFields = computed(() => {
      return (!title.value || !deadline.value || !text.value);

    })
    function createTestTask(){
      submit(null,{
        id: uuidv4(),
        title: lorem.generateSentences(2),
        deadline: '15-08-2030',
        text: lorem.generateParagraphs(4),
        status: 'active',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString().split(':').slice(0,2).join(':'),
        timeStamp: Date.now()
      })
    }

    async function submit(_,data = undefined) {
      let payload
      if (!data){
         payload = {
          id: uuidv4(),
          title: title.value,
          deadline: formatDate(deadline.value),
          text: text.value,
          status: 'active',
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString().split(':').slice(0,2).join(':'),
          timeStamp: Date.now()
         }
      }else {
        payload = data
      }
      const res = await taskReq.setTask(payload)
      if(res){
        router.push('/tasks')
      }
    }


    return {
      title,
      deadline,
      text,
      submit,
      checkFields,
      createTestTask
    }
  }
}
</script>

<style scoped>
.test{
  margin-bottom: 10px;
}
</style>