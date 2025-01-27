<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <h3>Para usuarios mayores de 18 años</h3>
    <br>
    <v-btn @click="() => { resetForm(); dialogUserForm = true; }" color="primary" prepend-icon="mdi-plus">
      Insertar usuario
    </v-btn>

    <v-dialog v-model="dialogUserForm" width="auto">
      <v-card max-width="400" >
        <v-card-title>
          <span class="headline">{{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field v-model="newUser.nombre" label="Nombre" :rules="nameRules" required></v-text-field>
            <v-text-field v-model="newUser.correo" label="Correo Electrónico" :rules="emailRules" required></v-text-field>
            <v-text-field v-model="newUser.edad" label="Edad" type="number" ></v-text-field>
            <v-btn type="submit" color="green" >{{ isEditing ? 'Actualizar Usuario' : 'Añadir Usuario' }}</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="warning" text @click="dialogUserForm = false">Cancelar</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
    <br>
    <v-data-table :headers="headers" :items="users" item-value="nombre" item-id="id" class="elevation-1 my-data-table"
      color="black" header-color="deep-purple" striped>

      <!-- Agregar columna de acciones (Editar/Eliminar) -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn small color="blue" @click="editUser(item)" icon="mdi-text-box-edit"></v-btn>
        <v-btn small color="red" @click="deleteUser(item.id)" icon="mdi-delete"></v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from '../axios';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {
    // Estado
    const dialogUserForm = ref(false);
    const users = ref([]);
    const formValid = ref(false);
    const isEditing = ref(false);
    const headers = [
      //{ title: 'ID', align: 'start', key: 'id' },
      { title: 'Nombre', align: 'start', key: 'nombre' },
      { title: 'Correo', align: 'start', key: 'correo' },
      { title: 'Edad', align: 'end', key: 'edad' },
      { title: 'Acciones', align: 'center', key: 'actions' }
    ];

    // Reglas de validación para cada campo
    const nameRules = [
      v => !!v || 'El nombre es requerido',
      v => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
    ];

    const emailRules = [
      v => !!v || 'El correo es requerido',
      v => /.+@.+\..+/.test(v) || 'El correo debe ser válido',
    ];

    // Estado del formulario

    const newUser = ref({
      nombre: '',
      correo: '',
      edad: null,
    })

    const resetForm = () => {
      newUser.value = {
        nombre: '',
        correo: '',
        edad: null,
      };
      isEditing.value = false;
    };

    const openAddDialog = () => {
      isEditing.value = false;
      newUser.value = { id: null, nombre: '', correo: '', edad: 0 }; // Limpiar formulario
      dialogUserForm.value = true;
    };

    // Función para obtener los usuarios
    const getUsers = async () => {
      try {
        const response = await axios.get('/users/');
        users.value = response.data;
      } catch (e) {
        console.error("Error al obtener usuarios", e);
      }
    };

    // Función para editar un usuario
    const editUser = (user) => {
      isEditing.value = true;
      newUser.value = { ...user }; // Rellenar el formulario con los datos del usuario
      dialogUserForm.value = true;
    };

    // Función para eliminar un usuario
    const deleteUser = async (id) => {
      try {
        await axios.delete(`/users/${id}`);
        getUsers(); // Actualizamos la lista después de eliminar
      } catch (e) {
        console.error("Error al eliminar el usuario", e);
      }
    };

    const submitForm = async () => {
      try {
        if (isEditing.value) {
          // Si estamos editando, hacemos una petición PUT
          newUser.value.edad = Number(newUser.value.edad); // Esto convierte a número

          // Desestructuramos 'id' y 'userData' correctamente
          const { id } = newUser.value;
          const userData = { ...newUser.value };
          delete userData.id; // Elimina 'id' del cuerpo de la solicitud
          console.log("Datos enviados:", newUser.value);
          const response = await axios.put(`/users/${id}`, userData);
          if (response.status === 200) {
            dialogUserForm.value = false;
            getUsers(); // Recargar la lista de usuarios
          }
        } else {
          
          const response = await axios.post('/users/', newUser.value);
          if (response.status === 201) {
            dialogUserForm.value = false;
            getUsers(); // Recargar la lista de usuarios
          }
        }
      } catch (error) {
        console.error("Error al guardar el usuario:", error.response?.data || error.message);
        alert("Error al registrar el usuario");
      }
    };


    getUsers();

    return {
      dialogUserForm,
      resetForm,
      formValid,
      nameRules,
      emailRules,
      isEditing,
      users,
      newUser,
      headers,
      getUsers,
      editUser,
      deleteUser,
      openAddDialog,
      submitForm
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.my-data-table {
  max-width: 900px;
  margin: 0 auto;
}
</style>
