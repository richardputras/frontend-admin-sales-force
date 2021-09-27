<template>
  <div class="content mt-3">
    <div class="container-fluid">
      <div class="d-flex">
        <h3>Daftar SOP</h3>
      </div>

      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <input type="text" class="form-control" v-model="filters.global" placeholder="Search...">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <DataTable :value="procedure" :filters="filters" :paginator="true" :rowsPerPageOptions="[5,10,25]" :rows="10" ref="dt" showGridlines>
            <template #empty>
                No records found
            </template>
            <Column field="index" header="#" sortable></Column>
            <Column field="division" header="Divisi" sortable></Column>
            <Column field="chief" header="Kepala Divisi" sortable></Column>
            <Column field="title" header="Judul SOP" sortable></Column>
            <Column field="link" header="Link SOP" sortable>
              <template #body="slotProps">
                <span v-if="slotProps.data.link != ''">
                  <a :href="slotProps.data.link" target="_blank" >Link</a>
                </span>
                <span v-else>
                    
                </span>
              </template>
            </Column>
            <Column field="start_at" header="Tanggal Efektif Berlaku" sortable></Column>
            <Column field="uploaded_at" header="Tanggal Upload" sortable></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  components: { DataTable, Column },
  layout: "sidebar",
  data() {
    return {
      filters: {},
      procedure: null
    }
  },
  created() {
    this.procedure = [
      {id: 1, "division": "IT", "chief": "Michael Santoso", "title": "Penanganan Bug Report", "link": "https://drive.google.com/drive/folders/1YM2Tn-EOsAXrWM5knNXXbsdY8_lw6_R2", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 2, "division": "IT", "chief": "Michael Santoso", "title": "Penambahan Fitur Baru", "link": "https://drive.google.com/drive/folders/1YM2Tn-EOsAXrWM5knNXXbsdY8_lw6_R2", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 3, "division": "IT", "chief": "Michael Santoso", "title": "Deployment", "link": "https://drive.google.com/drive/folders/1YM2Tn-EOsAXrWM5knNXXbsdY8_lw6_R2", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 4, "division": "IT", "chief": "Michael Santoso", "title": "Penambahan Materi di Bookstore oleh CT", "link": "https://drive.google.com/drive/folders/1YM2Tn-EOsAXrWM5knNXXbsdY8_lw6_R2", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 5, "division": "CT", "chief": "Wikantono", "title": "Persiapan Materi Video", "link": "https://drive.google.com/drive/folders/1f6ZZe7W7ArTYKxf36mNBPehIRevM0iHU", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 6, "division": "CT", "chief": "Wikantono", "title": "CT Job Order", "link": "https://drive.google.com/drive/folders/1f6ZZe7W7ArTYKxf36mNBPehIRevM0iHU", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 7, "division": "Marketing", "chief": "Khukuh", "title": "Sales Marketing Outclass", "link": "https://drive.google.com/drive/folders/1cY4dZC4aV6mv2QUTu_aKF3dNOtEF2j42", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 8, "division": "Marketing", "chief": "Khukuh", "title": "Penjualan dgn Strategi Perusahaan", "link": "https://drive.google.com/drive/folders/1cY4dZC4aV6mv2QUTu_aKF3dNOtEF2j42", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 9, "division": "HR", "chief": "Treschna", "title": "Pembuatan surat yang ditujukan kepada pegawai perusahaan", "link": "https://drive.google.com/drive/folders/1bQGBOqelE9_onu2L7dqia1FrWSyJseUt", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 10, "division": "HR", "chief": "Treschna", "title": "Update data pegawai perusahaan", "link": "https://drive.google.com/drive/folders/1bQGBOqelE9_onu2L7dqia1FrWSyJseUt", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 11, "division": "HR", "chief": "Treschna", "title": "Pemberian Verbal Warning dan Surat Peringatan", "link": "https://drive.google.com/drive/folders/1bQGBOqelE9_onu2L7dqia1FrWSyJseUt", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 12, "division": "HR", "chief": "Treschna", "title": "Perekrutan Pegawai Baru", "link": "https://drive.google.com/drive/folders/1bQGBOqelE9_onu2L7dqia1FrWSyJseUt", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 13, "division": "HR", "chief": "Treschna", "title": "Pemberian informasi perusahaan kepada Pegawai Baru", "link": "https://drive.google.com/drive/folders/1bQGBOqelE9_onu2L7dqia1FrWSyJseUt", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 14, "division": "HR", "chief": "Treschna", "title": "Absensi / Kehadiran Pegawai Perusahaan", "link": "https://drive.google.com/drive/folders/1bQGBOqelE9_onu2L7dqia1FrWSyJseUt", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 15, "division": "HR", "chief": "Treschna", "title": "Penerapan Protokol Kesehatan di Perusahaan", "link": "https://drive.google.com/drive/folders/1bQGBOqelE9_onu2L7dqia1FrWSyJseUt", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 16, "division": "HR", "chief": "Treschna", "title": "Pengunduran Diri Karyawan", "link": "https://drive.google.com/drive/folders/1bQGBOqelE9_onu2L7dqia1FrWSyJseUt", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 17, "division": "Legal", "chief": "Treschna", "title": "Pembuatan Kontrak Kerjasama dengan pihak lain", "link": "https://drive.google.com/drive/folders/19jyoJ51lMOE5FKifXzW21mWsOUDF9jnR", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 18, "division": "Legal", "chief": "Treschna", "title": "Mengevaluasi Kontrak Kerjasama dgn pihak lain", "link": "https://drive.google.com/drive/folders/19jyoJ51lMOE5FKifXzW21mWsOUDF9jnR", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 19, "division": "Legal", "chief": "Treschna", "title": "Pembuatan Surat yg ditujukan kepada pihak lain", "link": "https://drive.google.com/drive/folders/19jyoJ51lMOE5FKifXzW21mWsOUDF9jnR", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 20, "division": "Legal", "chief": "Treschna", "title": "Pengaturan Dokumen Perusahaan", "link": "https://drive.google.com/drive/folders/19jyoJ51lMOE5FKifXzW21mWsOUDF9jnR", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 21, "division": "Finance", "chief": "Frido", "title": "Pembayaran Tagihan/Reimbursement", "link": "https://drive.google.com/drive/folders/1bILnk9wiI2Sd3KOAiwYT-qmCbSIonkgk", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 22, "division": "Finance", "chief": "Frido", "title": "Pembelian Barang/Jasa", "link": "https://drive.google.com/drive/folders/1bILnk9wiI2Sd3KOAiwYT-qmCbSIonkgk", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 23, "division": "Akademik", "chief": "Delviera", "title": "Alur Mengajar Tutor Online (TutOn)", "link": "https://drive.google.com/drive/folders/1hu3XAAyDpqNhgutck3KpFCTQNNXMa6a9", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 24, "division": "Akademik", "chief": "Delviera", "title": "Alur Storyboard menjadi Media", "link": "https://drive.google.com/drive/folders/1hu3XAAyDpqNhgutck3KpFCTQNNXMa6a9", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 25, "division": "Akademik", "chief": "Delviera", "title": "Pembuatan Perangkat RPP", "link": "https://drive.google.com/drive/folders/1hu3XAAyDpqNhgutck3KpFCTQNNXMa6a9", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 26, "division": "Akademik", "chief": "Delviera", "title": "Question Maker", "link": "https://drive.google.com/drive/folders/1hu3XAAyDpqNhgutck3KpFCTQNNXMa6a9", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 27, "division": "Akademik", "chief": "Delviera", "title": "Tatacara Membuat Storyboard", "link": "https://drive.google.com/drive/folders/1hu3XAAyDpqNhgutck3KpFCTQNNXMa6a9", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 28, "division": "Akademik", "chief": "Delviera", "title": "Pendaftaran Tutor Online", "link": "https://drive.google.com/drive/folders/1hu3XAAyDpqNhgutck3KpFCTQNNXMa6a9", "start_at": "", "uploaded_at": "30-08-2021"},
      {id: 29, "division": "Training Development", "chief": "Hidayat Nataatmaja", "title": "Persiapan dan Pelaksanaan Training", "link": "https://drive.google.com/drive/folders/1t3y24XHMz1R7C1TN25Yipvg1B5t7PVFY", "start_at": "", "uploaded_at": "30-08-2021"},
    ],
    this.getProcedure()
  },
  methods: {
    getProcedure() {
       let index = 1
       this.procedure.map((item) => {
        item["index"] = index
        index++
      })
    }
  },
  filters: {
    dateTime(date) {
      return moment(date).format("DD MMM YYYY HH:mm")
    },
    hour(value) {
      return moment(value).format("DD-MM-YYYY")
    }
  }
}
</script>

<style>
</style>
