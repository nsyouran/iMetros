<template>
    <div id="wxjc">
        <div class="searchBar">
            <el-collapse v-model="activeNames" size="mini" style="border: 1px solid #EBEEF5;">
                <el-collapse-item title="　查询条件" name="1" >                    
                    <el-form ref="form" :model="searchForm" label-width="6em" size="mini" style="padding: 0 10px; margin-bottom: -25px">
                        <el-row>
                            <el-col :span="16">
                                <el-form-item label="检测单位">
                                    <el-autocomplete style="width:100%"
                                        clearable
                                        v-model="searchForm.zsdw_name"
                                        :fetch-suggestions="zsdw_search"
                                        :trigger-on-focus="false"
                                        @select="search"
                                    ></el-autocomplete>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="检测地点">
                                    <el-input @change="search" clearable v-model="searchForm.task_name"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="仪器名称">
                                    <el-input @change="search" clearable v-model="searchForm.product_name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="规格型号">
                                    <el-input @change="search" clearable v-model="searchForm.product_type"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="出厂编号">
                                    <el-input @change="search" clearable v-model="searchForm.product_number"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="16">
                                <el-form-item label="检测日期">
                                    <el-date-picker
                                        style="width: 100%" editable unlink-panels clearable
                                        v-model="searchForm.date"
                                        type="daterange"                                        
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        @change="search"
                                        :picker-options="searchForm.searchPickerOptions">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="生产厂商">
                                    <el-input @change="search" clearable v-model="searchForm.product_factory"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
        </div> 
        
        <div class="toolBar">            
            <el-button-group>
                <el-button size="mini" @click="search" type="">查询</el-button>
                <el-button size="mini" @click="test" type="" >测试</el-button>
            </el-button-group>
        </div>
        
        <div class="table">
            <el-table class="table-body" height="100%"
                v-loading="tableLoading"
                ref="multipleTable"
                :data="tableData"                
                border stripe highlight-current-row
                size="mini">
                <el-table-column
                    type="index"
                    width="50px">
                </el-table-column>
                <el-table-column
                    type="selection"
                    width="50px" />
                
                <el-table-column
                    prop="zsdw_name"
                    sortable
                    label="检测单位">
                </el-table-column>
                <el-table-column
                    prop="product_name"
                    sortable
                    label="仪器名称">
                </el-table-column>
                <el-table-column
                    prop="product_type"
                    sortable
                    label="规格型号">
                </el-table-column>
                <el-table-column
                    prop="product_number"
                    sortable
                    label="出厂编号">
                </el-table-column>
                <el-table-column
                    prop="product_factory"
                    sortable
                    label="生产厂商">
                </el-table-column>
                <el-table-column
                    prop="task_name"
                    sortable
                    label="检测地点">
                </el-table-column>
                <el-table-column
                    prop="date"
                    sortable
                    label="日期"
                    width="100"
                    >
                </el-table-column>
            </el-table>            
        </div>

        <div class="pagination">
            <el-pagination 
                :current-page="dateCurrentPage"
                :page-sizes="[5, 20, 100, 500]"
                :page-size="searchForm.limit"
                @size-change="pageSizeChange"
                @current-change="pageCurrentChange"
                @prev-click="pagePrevClick"
                @next-click="pageNextClick"
                layout="total, sizes, prev, pager, next, jumper"
                :total="dataTotal">
            </el-pagination>
        </div>        
    </div>
</template>    

<script>

export default {
    name: "comWxjc",
    data() {
      return {
        activeNames: ["1"],        
        searchForm: {
            limit: 20,
            zsdw_name: "",
            task_name: "",
            product_name: "多参数监护仪",
            product_type: "",
            product_number: "",
            product_factory: "",
            searchPickerOptions: {
                shortcuts: [{
                    text: "一月内",
                    onClick(picker) {
                        let date = new Date()
                        let fromDate = date.setMonth(date.getMonth() - 1)
                        picker.$emit('pick', [fromDate, new Date()])
                    }
                },{
                    text: "三月内",
                    onClick(picker) {
                        let date = new Date()
                        let fromDate = date.setMonth(date.getMonth() - 3)
                        picker.$emit('pick', [fromDate, new Date()])
                    }
                },{
                    text: "一年内",
                    onClick(picker) {
                        let date = new Date()
                        let fromDate = date.setMonth(date.getMonth() - 12)
                        picker.$emit('pick', [fromDate, new Date()])
                    }
                }]
            },
            date: [new Date() - 3600 * 1000 * 24 * 7,new Date()]
        },
        tableData: [],
        tableLoading: false,
        dataTotal: 0,
        dateCurrentPage: 1
      }
    },
    methods: {
        test: function(){
            console.log(this.$router)
        },
        zsdw_search: function(value, cb){
            const db = this.$cloud.database()
            db.collection("zsdw").aggregate().match({
                name: db.RegExp({
                    regexp: `.*?${value}.*?`,
                    options: "i",
                })
            })
            .project({
                _id: 0,
                label: "$name",
                value: "$name"
            }).limit(10).end()
            .then(res=>{
                // console.log(res)
                cb(res.data)
            }).catch(err=>{
                alert(err)
            })
        },        
        pageSizeChange: function(value){
            this.searchForm.limit = value
            this.search()
        },
        pageCurrentChange: function(value){
            this.dateCurrentPage = value
            this.search()
        },
        pagePrevClick: function(){},
        pageNextClick: function(){},
        search: function(){
            this.tableLoading = true
            const db = this.$cloud.database()
            const _ = db.command
            const $ = _.aggregate
            const fromDate = new Date(this.searchForm.date[0])
            const toDate = this.searchForm.date[1]
            // console.log(fromData)
            // console.log(toData)
            // console.log("skip", this.searchForm.limit * (this.dateCurrentPage - 1))
            db.collection("tests").aggregate().addFields({
                matched: db.command.aggregate.and([
                    $.gte([
                        "$date",
                        $.dateFromString({
                            dateString: fromDate.toJSON(),
                        })
                    ]),
                    $.lte([
                        "$date",
                        $.dateFromString({
                            dateString: toDate.toJSON(),
                        })
                    ])
                ])
            }).match({
                matched: true,
                zsdw_name: db.RegExp({
                    regexp: `.*?${this.searchForm.zsdw_name}.*?`,
                    options: "i",
                }),
                task_name: db.RegExp({
                    regexp: `.*?${this.searchForm.task_name}.*?`,
                    options: "i",
                }),
                product_name: db.RegExp({
                    regexp: `.*?${this.searchForm.product_name}.*?`,
                    options: "i",
                }),
                product_type: db.RegExp({
                    regexp: `.*?${this.searchForm.product_type}.*?`,
                    options: "i",
                }),
                product_number: db.RegExp({
                    regexp: `.*?${this.searchForm.product_number}.*?`,
                    options: "i",
                }),
                product_factory: db.RegExp({
                    regexp: `.*?${this.searchForm.product_factory}.*?`,
                    options: "i",
                })
            }).project({
                zsdw_name: true, product_name: true, product_type: true, product_number: true, product_factory: true, task_name: true,
                date: $.dateToString({
                    date: "$date",
                    format: "%Y-%m-%d",
                    timezone: "Asia/Shanghai"
                })
            }).sort({date: -1})
            .skip(this.searchForm.limit * (this.dateCurrentPage - 1))
            .limit(this.searchForm.limit)
            .end() //
            .then(res=>{
                this.tableLoading = false
                this.tableData = res.data
            }).catch(err=>{
                alert(err)
            })
            db.collection("tests").where({
                date: _.and(_.gte(fromDate), _.lte(toDate)),
                zsdw_name: db.RegExp({
                    regexp: `.*?${this.searchForm.zsdw_name}.*?`,
                    options: "i",
                }),
                task_name: db.RegExp({
                    regexp: `.*?${this.searchForm.task_name}.*?`,
                    options: "i",
                }),
                product_name: db.RegExp({
                    regexp: `.*?${this.searchForm.product_name}.*?`,
                    options: "i",
                }),
                product_type: db.RegExp({
                    regexp: `.*?${this.searchForm.product_type}.*?`,
                    options: "i",
                }),
                product_number: db.RegExp({
                    regexp: `.*?${this.searchForm.product_number}.*?`,
                    options: "i",
                }),
                product_factory: db.RegExp({
                    regexp: `.*?${this.searchForm.product_factory}.*?`,
                    options: "i",
                })
            }).count().then(res=>{
                // console.log(res)
                this.dataTotal = res.total
            }).catch(err=>{alert(err)})
        }
    },
    mounted: function(){       

    }
}

</script>  


<style scoped>
#wxjc {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
}
.toolBar {
    margin: 10px 0;
}
.table {
    position: relative;
    flex-grow: 1;
}
.table-body {
    position: absolute;
}
.pagination {
    margin-top: 2px;
}
</style>