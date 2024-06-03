
import {GET_MENULIST} from "@/statics/networks.js";

export const adminMenuLayout = (children) => {
    function render(_html) {
        document.querySelector('#app').innerHTML = `            
            
            
            <div id="grid" style="width: 1000px;"></div>
        
            <button id="btnAdd">
                 추가
            </button>
        
            <div style="text-align: center; margin-top: 20px;">
                <button onclick="window.location.href='/'" style="padding: 10px 20px; background-color: #7F7F7F; color: #fff; border: none; border-radius: 5px; cursor: pointer;">
                    Go to Home
                </button>
            </div>
            
        `;

        //todo 이벤트 처리
    }

    render();

    let Grid = tui.Grid;

    const dataSource = {
        api: {
            readData: { url: `${GET_MENULIST}`, method: 'GET', initParams: { param: 'param' } }
        }
    };

    const grid = new Grid({
        data: dataSource,
        el: document.getElementById('grid'), // 컨테이너 엘리먼트
        columns: [
            {
                header: 'ID',
                name: 'menuId',
                editor: 'text',
                required: true,
                width: 100,
            },
            {
                header: 'TemplateId',
                name: 'templateId',
                editor: 'text',
                required: true,
                width: 100,
            },
            {
                header: 'Path',
                name: 'path',
                editor: 'text',
                required: true
            },
            {
                header: 'MenuName',
                name: 'menuName',
                editor: 'text',
                required: true
            }
        ],
    });

    document.querySelector("#btnAdd").addEventListener('click', (e) => {
        grid.appendRow();
    });

    grid.on('click', function (e) {

        // 수정 창 열기


        // startCellEditing();

        // console.log(grid.getRow(e.rowKey));

        // grid.getFocusedCell();
        // openEditDialogsForSelectedRows();

        // console.log(getSelectedCellName());
        // console.log(getSelectedRowId());
        // console.log(getSelectedRow());
        // console.log(getSelectedCellValue());
        console.log(setSelectedCellValue('sss'));

    });

    function startCellEditing() {
        grid.startEditing(getSelectedRowId(), getSelectedCellName());
    }

    /**
     * 선택된 row 정보
     * @returns {*}
     */
    function getSelectedRow() {
        return grid.getRow(grid.getFocusedCell());
    }

    /**
     * 선택된 cell(column) 명
     * @returns {*}
     */
    function getSelectedCellName() {
        return grid.getFocusedCell().columnName;
    }

    /**
     * 선택된 cell(column)의 모든 row 값 반환
     * @returns {*}
     */
    function getSelectedCellAllValues() {
        return grid.getColumnValues(getSelectedCellName())
    }

    /**
     * 선택된 cell(column)의 값 반환
     * @returns {*}
     */
    function getSelectedCellValue() {
        return grid.getValue(getSelectedRowId(), getSelectedCellName());
    }

    /**
     * 선택된 cell(column) 값 변경
     * 주의 : 변경모드일경우 데이터 set 안됨.
     * @returns {*}
     */
    function setSelectedCellValue(value) {
        return grid.setValue(getSelectedRowId(), getSelectedCellName(), value);
    }

    /**
     * 선택된 rowid, rowkey
     * @returns {*}
     */
    function getSelectedRowId() {
        return grid.getFocusedCell().rowKey;
    }

    function getSelectedRowKey() {
        return grid.getFocusedCell().rowKey;
    }

    /**
     * 재조회
     */
    function retrieveData() {
        grid.readData();
    }

    /**
     * cell 선택시 로우 선택된것 같은 효과(버그 있음)
     */
    grid.on('focusChange', (ev) => {
        grid.setSelectionRange({
            start: [ev.rowKey, 0],
            end: [ev.rowKey, grid.getColumns().length]
        });
    });

    // let selectedRowKey = null;
    // grid.on('focusChange', ev => {
    //     if (selectedRowKey) {
    //         grid.removeRowClassName(selectedRowKey, 'someClassName');
    //     }
    //     selectedRowKey = ev.rowKey;
    //     grid.addRowClassName(selectedRowKey, 'someClassName');
    // });


    // 수정 창 열기 함수
    function openEditDialog(rowKey, columnName) {
        grid.startEditing(rowKey, columnName);
    }



    tui.Grid.prototype.getSelectedRows = function(){
        var inputRange = this.modelManager.selectionModel.inputRange;
        var currentRow = this.$el.find('.tui-grid-cell-current-row:first').parents('tr').data('rowKey');

        if(inputRange){
            var selectedRows = [];
            for(var i = inputRange.row[0]; i <= inputRange.row[inputRange.row.length-1] ; i++)
                selectedRows.push(this.getRowAt(i,false));

            return selectedRows;
        }
        else if(currentRow){
            return [this.getRowAt( this.$el.find('.tui-grid-cell-current-row:first').parents('tr').data('rowKey') , false)];
        }

        return null;
    };


    // grid.appendRow({menuId:'1',templateId:'2',path:'3',menuName:'4'});
    // grid.appendRow({});
    // grid.appendRow({});
    // grid.appendRow({});

    // var editor = ace.edit("editor");
    // editor.setTheme("ace/theme/monokai");
    // editor.session.setMode("ace/mode/html");
    //
    // document.querySelector("#previewBtn").addEventListener('click', updatePreview);
    //
    // function updatePreview() {
    //     var html = editor.getValue();
    //     document.getElementById('preview').innerHTML = html;
    // }

}
