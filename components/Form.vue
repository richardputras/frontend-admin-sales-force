<template>
    <div>
        <div v-for="(field, index) in fieldList" :key="index">
            <div v-if="field['ReadOnly']">
                <!-- {
                    "Name": "Nama",
                    "Description": "Contoh deskripsi",
                    "Data": "name",
                    "ReadOnly": true
                }, -->
                <div class="form-group">
                    <h5 class="font-weight-bold">{{field["Name"]}}</h5>
                    <h6 class="form-description">{{field["Description"]}}</h6>
                    <h5>{{form[field["Data"]]}}</h5>
                </div>
            </div>
            <div v-else>
                <div v-if="field['Type'] == 'Text'">
                    <!-- {
                        "Name": "Nama",
                        "Description": "Contoh deskripsi",
                        "Data": "name",
                        "Type": "Text",
                        "Obscured": true
                    }, -->
                    <div class="form-group">
                        <h5 class="font-weight-bold">{{field["Name"]}}</h5>
                        <h6 class="form-description">{{field["Description"]}}</h6>
                        <input :type="field['Obscured'] ? 'password':'text'" class="form-control" v-model="form[field['Data']]">
                    </div>
                </div>
                <div v-if="field['Type'] == 'Number'">
                    <!-- {
                        "Name": "Nama",
                        "Description": "Contoh deskripsi",
                        "Data": "name",
                        "Type": "Number"
                    }, -->
                    <div class="form-group">
                        <h5 class="font-weight-bold">{{field["Name"]}}</h5>
                        <h6 class="form-description">{{field["Description"]}}</h6>
                        <input type="text" class="form-control" v-model="form[field['Data']]">
                    </div>
                </div>
                <div v-if="field['Type'] == 'TextArea'">
                    <!-- {
                        "Name": "Deskripsi",
                        "Description": "Contoh deskripsi",
                        "Data": "description",
                        "Type": "TextArea"
                    }, -->
                    <div class="form-group">
                        <h5 class="font-weight-bold">{{field["Name"]}}</h5>
                        <h6 class="form-description">{{field["Description"]}}</h6>
                        <textarea class="form-control" cols="10" rows="5" v-model="form[field['Data']]"></textarea>
                    </div>
                </div>
                <div v-if="field['Type'] == 'Image'">
                    <!-- {
                        "Name": "Gambar",
                        "Description": "Contoh deskripsi",
                        "Data": "image",
                        "Type": "Image",
                        "Module": "recipes"
                    }, -->
                    <div class="form-group">
                        <h5 class="font-weight-bold">{{field["Name"]}}</h5>
                        <h6 class="form-description">{{field["Description"]}}</h6>
                        <img class="img img-fluid" :src="asset(field['Module'], form[field['Data']])" />
                    </div>
                </div>
                <div v-if="field['Type'] == 'Select'">
                    <!-- {
                        "Name": "Hari",
                        "Description": "Contoh deskripsi",
                        "Data": "Day",
                        "Type": "Select",
                        "ContentList": [
                            {
                            "Name": "Pilihan 1",
                            "Value": "1",
                            },
                            {
                            "Name": "Pilihan 2",
                            "Value": "2",
                            },
                        ],
                        "Loading": false
                    }, -->
                    <div class="form-group">
                        <h5 class="font-weight-bold">{{field["Name"]}}</h5>
                        <h6 class="form-description">{{field["Description"]}}</h6>
                        <div v-if="field['Loading']" class="text-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        <div v-else>
                            <select class="form-control" v-model="form[field['Data']]">
                                <option value="0" disabled selected>Pilih</option>
                                <option v-for="(content, index) in field['ContentList']"
                                    v-bind:key="index" :value="content.Value">{{ content.Name }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div v-if="field['Type'] == 'Time'">
                    <!-- {
                        "Name": "Waktu Mulai",
                        "Description": "Contoh deskripsi",
                        "Data": "StartTime",
                        "Type": "Time"
                    }, -->
                    <div class="form-group">
                        <h5 class="font-weight-bold">{{field["Name"]}}</h5>
                        <h6 class="form-description">{{field["Description"]}}</h6>
                        <input type="time" class="form-control" v-model="form[field['Data']]">
                    </div>
                </div>

                <div v-if="field['Type'] == 'DateTime'">
                    <!-- {
                        "Name": "Tanggal Mulai",
                        "Description": "Contoh deskripsi",
                        "Data": "StartDate",
                        "Type": "DateTime"
                    }, -->
                    <div class="form-group">
                        <h5 class="font-weight-bold">{{field["Name"]}}</h5>
                        <h6 class="form-description">{{field["Description"]}}</h6>
                        <VueCtkDateTimePicker id="publishDatePicker" v-model="form[field['Data']]"
                            color="#0094DA" button-color="#0094DA" :only-date="true" :right="true"
                            label="Pilih Tanggal" locale="id" format="DD-MM-YYYY" :no-label="true"
                            formatted="ll" :no-shortcuts="true" :no-header="true"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

export default {
    props: ['fieldList', 'form'],
    components: {VueCtkDateTimePicker},
}
</script>

<style>
    .form-description {
        color: gray;
    }
</style>