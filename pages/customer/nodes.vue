<template>
    <div class="content mt-3">
        <div class="container-fluid">
                <div class="bg-white shadow-sm p-3">
                    <h3>Customer Chart</h3>
                    <div id="tree" ref="tree"><OrgChart /></div>
                </div>
            </div>
    </div>
</template>

<script>
    import OrgChart from '@balkangraph/orgchart.js'

    export default {
        layout: "sidebar",
        name: 'tree',
        data() {
            return {
                nodes: [],
            }
        },

        async mounted(){
            const res = await this.apiGet("nodes")

            this.nodes = {}
            this.nodes = res.data.data

            var NewNodes = []; // untuk ditampilkan ke plugin

            for(var i=0; i<this.nodes.length; i++){

                var tempNewNodes = {};
                tempNewNodes["id"] = this.nodes[i]["id"]
                tempNewNodes["pid"] = this.nodes[i]["parent_id"]
                tempNewNodes["name"] = this.nodes[i]["name"]
                NewNodes.push(tempNewNodes)
            }

            this.oc(this.$refs.tree, NewNodes)
        },

        methods: {
            oc: function(domEl, x) {

                OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.ana);
                OrgChart.templates.myTemplate.size = [150, 53];

                OrgChart.templates.myTemplate.field_0 = '<text style="font-size: 14px;" fill="#ffffff" x="78" y="28" text-anchor="middle">{val}</text>';
                this.chart = new OrgChart(domEl, {
                template: "myTemplate",
                enableSearch: false,
                nodes: x,
                nodeBinding: {
                    field_0: "name",
                    // field_1: "title",
                    // img_0: "img"
                }
                });
            }
        },
    }
</script>

<style>
</style>