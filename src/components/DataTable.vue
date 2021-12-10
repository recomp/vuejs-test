<template>
  <div class="data-table">
    <div class="data-table__filter">
      <ui-money
        v-model="moneyQuery"
        @input="filterTable" />
    </div>
    <div class="data-table__wrapper">
      <div
        class="data-table__header"
        :style="{gridTemplateColumns: headerStyle}">
        <div
          v-for="column in columns"
          :key="`column_${column.prop}`"
          :class="`column-${column.prop}`"
          class="data-table__header-column"
          >
          <button
            class="data-table__header-sort"
            @click="sortBy(column)">
            {{ column.label}}
          </button>
        </div>
      </div>
      <div class="data-table__body">
        <div
          v-for="(row, index) in filteredRows"
          :key="`row_${index}`"
          :style="{gridTemplateColumns: headerStyle}"
          class="data-table__row">
          <div
            v-for="column in columns"
            :key="`row_column_${column.prop}`"
            :class="`column-${column.prop}`"
            class="data-table__row-column">
            <span class="data-table__row-column__title">
              {{ column.label }}
            </span>
            <template v-if="column.prop === 'date'">
              {{ row[column.prop] | formatDate }}
            </template>
            <template v-if="column.prop === 'money'">
              {{ row[column.prop] | moneyFormat }}
            </template>
            <template v-if="!['date', 'money'].includes(column.prop)">
              {{ row[column.prop] }}
            </template>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="!moneyFilter"
      class="data-table__paginator">
      <ui-pagination
        v-model="page"
        :pages="pageCount"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    moneyFilter: 0,
    activeSort: null,
  }),
  computed: {
    filteredRows() {
      if (!this.moneyFilter) {
        return this.rows;
      }
      return [...this.rows].filter((row) => row.money <= this.moneyFilter);
    },
    pageSize() {
      return this.$store.state.pageSize;
    },
    page: {
      get() {
        return this.$store.state.page;
      },
      set(page) {
        this.$store.dispatch('set_page', page);
      },
    },
    moneyQuery: {
      get() {
        return this.$options.filters.moneyFormat(this.moneyFilter);
      },
      set(value) {
        this.moneyFilter = value;
      },
    },
    headerStyle() {
      const widthArray = [...this.columns].map((col) => {
        return col.width;
      });
      return widthArray.join(' ');
    },
    pageCount() {
      return Math.ceil(this.$store.getters.count / this.pageSize);
    },
  },
  methods: {
    filterTable(money) {
      console.log('filterTable', money);
    },
    sortBy({ prop }) {
      if (this.activeSort === prop) {
        // statement
      }
      this.activeSort = prop;
      console.log('sortBy', prop);
    },
  },
};
</script>
<style lang="sass">
$rows-height: 60px
.data-table
  width: 100%
  .data-table__filter
    display: flex
    flex-direction: row
    justify-content: flex-end
    align-items: center
    margin-bottom: 25px
  .data-table__wrapper
    width: 100%
    display: grid
    grid-template-rows: 35px 1fr
    margin-bottom: 20px
    @media screen and (max-width: 768px)
      grid-template-rows: unset
      height: 100%
    .data-table__header
      display: grid
      @media screen and (max-width: 768px)
        display: none
      .data-table__header-column
        border: 1px solid #000
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
        @media screen and (max-width: 768px)
          border: 0
        .data-table__header-sort
          background: transparent
          border: 0
    .data-table__body
      @media screen and (max-width: 768px)
        display: grid
        grid-template-rows: unset
        gap: 10px 0
      .data-table__row
        width: 100%
        display: grid
        grid-template-rows: $rows-height
        @media screen and (max-width: 768px)
          border: 1px solid #000
          grid-template-columns: 1fr !important
          grid-template-rows: unset
        .data-table__row-column
          border: 1px solid #000
          display: flex
          flex-direction: row
          justify-content: center
          align-items: center
          @media screen and (max-width: 768px)
            flex-direction: column
            justify-content: flex-start
            align-items: flex-start
            border: 0
            margin-bottom: 10px
            padding: 10px
          .data-table__row-column__title
            display: none
            @media screen and (max-width: 768px)
              display: block
              font-weight: bold
              font-size: 16px
</style>
