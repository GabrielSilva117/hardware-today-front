<template>
  <v-responsive
    class="align-centerfill-height mx-auto mt-3"
    max-width="900"
  >
    <h2>
      Login
    </h2>
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Username"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          label="Password"
        />
      </v-col>
      <v-col>
        <v-btn
          class="me-4"
          type="submit"
          @click="validateUser"
        >
          Login
        </v-btn>
        <v-btn>
          <a href="/register">
            Register
          </a>
        </v-btn>
      </v-col>
    </v-row>
  </v-responsive>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required } from '@vuelidate/validators'
  import UserService from '@/services/UserService'

  const initialState = {
    email: '',
    password: '',
  }

  const rules = {
    email: { email, required },
    password: { required },
  }

  const state = reactive({ ...initialState })

  useVuelidate(rules, state)

  async function validateUser () {
    const userModel = {
      email: state.email,
      password: state.password,
    }

    try {
      await UserService.get(userModel)
    } catch (e) {
      console.error(e)
    }
  }
</script>

<style scoped lang="sass">

</style>
