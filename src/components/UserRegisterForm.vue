<template>
  <v-responsive
    class="align-centerfill-height mx-auto mt-3"
    max-width="900"
  >
    <h2 class="pb-2">
      Register Account
    </h2>
    <small>Already have an account? <a href="/">Sign in here</a> </small>
    <form @submit.prevent="handleSubmit">
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="state.firstName"
            :counter="10"
            :error-messages="v$.firstName.$errors.map(e => e.$message)"
            label="First Name"
            required
            @blur="v$.firstName.$touch"
            @input="v$.firstName.$touch"
          />
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="state.lastName"
            :counter="10"
            :error-messages="v$.lastName.$errors.map(e => e.$message)"
            label="Last Name"
            required
            @blur="v$.lastName.$touch"
            @input="v$.lastName.$touch"
          />
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="state.cellphoneNumber"
            v-maska="'(##) #####-####'"
            :counter="11"
            :error-messages="v$.cellphoneNumber.$errors.map(e => e.$message)"
            label="CellPhone Number"
            required
            @blur="v$.cellphoneNumber.$touch"
            @input="v$.cellphoneNumber.$touch"
          />
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="state.cep"
            :error-messages="v$.cep.$errors.map(e => e.$message)"
            label="CEP"
            required
            @blur="v$.cep.$touch"
            @input="v$.cep.$touch"
          />
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="state.address"
            :error-messages="v$.address.$errors.map(e => e.$message)"
            label="Address"
            required
            @blur="v$.address.$touch"
            @input="v$.address.$touch"
          />
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="state.city"
            :error-messages="v$.city.$errors.map(e => e.$message)"
            label="City"
            required
            @blur="v$.city.$touch"
            @input="v$.city.$touch"
          />
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="state.neighborhood"
            :error-messages="v$.neighborhood.$errors.map(e => e.$message)"
            label="Neighborhood"
            required
            @blur="v$.neighborhood.$touch"
            @input="v$.neighborhood.$touch"
          />
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="state.state"
            :error-messages="v$.state.$errors.map(e => e.$message)"
            label="State"
            required
            @blur="v$.state.$touch"
            @input="v$.state.$touch"
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="state.email"
            :error-messages="v$.email.$errors.map(e => e.$message)"
            label="E-mail"
            required
            @blur="v$.email.$touch"
            @input="v$.email.$touch"
          />
        </v-col>

        <v-col cols="12">
          <v-btn
            class="me-4"
            type="submit"
            @click="v$.$validate"
          >
            submit
          </v-btn>
          <v-btn @click="clear">
            clear
          </v-btn>
        </v-col>
      </v-row>

    </form>
  </v-responsive>
</template>
<script setup>
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required } from '@vuelidate/validators'
  import UserService from '@/services/UserService'

  const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/
  const phoneValidator = value => phoneRegex.test(value) || 'Invalid phone number format'

  const initialState = {
    firstName: '',
    lastName: '',
    company: null,
    cellphoneNumber: '',
    email: '',
    cep: '',
    address: '',
    neighborhood: '',
    city: '',
    state: '',
  }

  const state = reactive({
    ...initialState,
  })

  const rules = {
    firstName: { required },
    lastName: { required },
    company: { required },
    cellphoneNumber: { required, phoneValidator },
    email: { required, email },
    cep: { required },
    address: { required },
    neighborhood: { required },
    city: { required },
    state: { required },
  }

  const v$ = useVuelidate(rules, state)

  function clear () {
    v$.value.$reset()

    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value
    }
  }

  async function handleSubmit () {
    const userModel = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: 'state.password',
      cellphoneNumber: state.cellphoneNumber,
      address: {
        address: state.address,
        cep: state.cep,
        city: state.city,
        neighborhood: state.neighborhood,
        state: state.state,
      },
    }

    try {
      await UserService.post(userModel)
    } catch (e) {
      console.error(e)
    }
  }

</script>
