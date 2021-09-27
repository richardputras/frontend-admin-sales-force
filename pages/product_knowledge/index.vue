<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row p-3">
        <div class="offset-3 col-md-5 pl-5">
            <h3 class="text-24-sb">({{productKnowledgeList.length}})
                List Product Knowledge
                <i class="fas fa-plus fa-xs cursor-pointer text-primary" @click="goToProductKnowledgeForm()"></i>
            </h3>
            <div v-if="productKnowledgeListLoading">
              <div class="spinner-border mt-5 ml-5" role="status">
                <div><span style="color:white;">_</span>
                </div>
              </div>
            </div>
            
            <div v-for="(productKnowledge, index) in productKnowledgeList" :key="productKnowledge.title">
              <div>
                  <h5><i class="fas fa-pencil-alt fa-xs cursor-pointer text-warning" @click="goToProductKnowledgeForm(productKnowledge.id)" ></i>
                  {{index + 1}}. {{productKnowledge.title}}</h5>
                  <p>{{productKnowledge.description}}</p>
                  <span>Kategori:
                    <span v-if="productKnowledge.product_category_id == '1'">Tuton Hub</span>
                    <span v-if="productKnowledge.product_category_id == '2'">Perpus Book Store</span>
                    <span v-if="productKnowledge.product_category_id == '3'">Learning Management System</span>
                    <span v-if="productKnowledge.product_category_id == '4'">Video Conference</span>
                    <span v-if="productKnowledge.product_category_id == '5'">Admin Sekolah</span>
                  </span>
                  <br>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  layout: 'sidebar',
  data() {
    return {
        productKnowledgeList: [],
        productKnowledgeListLoading: true,
    }
  },
  
  created() {
    this.getProductKnowledgeList();
  },
  methods: {
    async getProductKnowledgeList() {
      const res = await this.apiGet("product_knowledges")

      this.productKnowledgeList = res.data.data;
      this.productKnowledgeListLoading = false
    },
    goToProductKnowledgeForm(id) {
        var link = "/product_knowledge/form"

        if (id != null)
            link += "?id=" + id

        this.$router.push(link)
    },
  },
}
</script>
