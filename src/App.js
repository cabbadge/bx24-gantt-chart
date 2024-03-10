import React, { useState, useEffect } from "react";
import { Divider, Radio, Table, Modal } from "antd";
import PropertyDetails from "./PropertyDetails";
import BX24API from "./bx24";

const App = () => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [tableData, setTableData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);

  // Функция для обновления данных таблицы

  const fetchTableData = async () => {
    var params = {
      ELEMENT_ORDER: { ID: "DESC" },
      IBLOCK_TYPE_ID: "lists",
      IBLOCK_ID: "62",
    };

    try {
      const result = await BX24API.callMethod("lists.element.get", params);

      if (result.error) {
        alert("Error: " + result.error);
      } else {
        console.log(result.result);

        setTableData(result.result);
      }
    } catch (error) {
      console.error("Error fetching table data:", error);
      alert("An error occurred while fetching data.");
    }
  };

  // Используем useEffect для загрузки данных при монтировании компонента

  useEffect(() => {
    fetchTableData();
  }, []);

  // Пустой массив зависимостей, чтобы вызвать эффект только при монтировании

  const showDetailsModal = (itemDetails) => {
    setSelectedItemDetails(itemDetails);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Название",
      dataIndex: "NAME",
      key: "name",
      render: (text, record) => (
        <a onClick={() => showDetailsModal(record)}>{text}</a>
      ),
    },
    {
      title: "Краткое описание",
      dataIndex: "PREVIEW_TEXT",
      key: "previewText",
      render: (text) => <div>{text}</div>,

      // Просто отображаем текст
    },
    {
      title: "Статус",
      dataIndex: "PROPERTY_578",
      key: "status",
      render: (status) => {
        const statusValue = Object.values(status)[0];
        let statusText = "";
        switch (statusValue) {
          case "5118":
            statusText = "In Progress";
            break;
          case "5006":
            statusText = "Rejected";
            break;
          default:
            statusText = "completed";
        }
        return <div>{statusText}</div>;
      },
    },

    // Добавьте другие колонки по аналогии
  ];

  // Здесь должна быть информация о полях, как в вашем примере выше

  const fieldsInfo = [
    {
      ID: "510",
      NAME: "Shermyrza",
      DISPLAY_VALUES_FORM: {
        5004: "Approved",
        5006: "Rejected",
        5008: "Approve with Conditions",
      },
    },
    {
      ID: "524",
      NAME: "NATASHA",
      DISPLAY_VALUES_FORM: {
        5010: "Approved",
        5012: "Rejected",
        5116: "Approve with Conditions",
      },
    },
    {
      ID: "546",
      NAME: "BERMET",
      DISPLAY_VALUES_FORM: {
        5016: "Approved",
        5018: "Rejected",
        5020: "Approve with Conditions",
      },
    },
    {
      ID: "548",
      NAME: "AALY",
      DISPLAY_VALUES_FORM: {
        5022: "Approved",
        5024: "Rejected",
        5026: "Approve with Conditions",
      },
    },
    {
      ID: "550",
      NAME: "DAVAA",
      DISPLAY_VALUES_FORM: {
        5028: "Approved",
        5030: "Rejected",
        5032: "Approve with Conditions",
      },
    },
    {
      ID: "552",
      NAME: "TAKESUE",
      DISPLAY_VALUES_FORM: {
        5106: "Approved",
        5108: "Rejected",
        5110: "Approve with Conditions",
      },
    },
    {
      ID: "554",
      NAME: "WADA",
      DISPLAY_VALUES_FORM: {
        5100: "Approved",
        5102: "Rejected",
        5104: "Approve with Conditions",
      },
    },
    {
      ID: "556",
      NAME: "LEO",
      DISPLAY_VALUES_FORM: {
        5094: "Approved",
        5096: "Rejected",
        5098: "Approve with Conditions",
      },
    },
    {
      ID: "558",
      NAME: "HANEDA",
      DISPLAY_VALUES_FORM: {
        5088: "Approved",
        5090: "Rejected",
        5092: "Approve with Conditions",
      },
    },
    {
      ID: "560",
      NAME: "ASEL",
      DISPLAY_VALUES_FORM: {
        5082: "Approved",
        5084: "Rejected",
        5086: "Approve with Conditions",
      },
    },
    {
      ID: "562",
      NAME: "LERA",
      DISPLAY_VALUES_FORM: {
        5076: "Approved",
        5078: "Rejected",
        5080: "Approve with Conditions",
      },
    },
    {
      ID: "564",
      NAME: "SHINE",
      DISPLAY_VALUES_FORM: {
        5070: "Approved",
        5072: "Rejected",
        5074: "Approve with Conditions",
      },
    },
    {
      ID: "566",
      NAME: "MURILLO",
      DISPLAY_VALUES_FORM: {
        5064: "Approved",
        5066: "Rejected",
        5068: "Approve with Conditions",
      },
    },
    {
      ID: "568",
      NAME: "HENRIQUE",
      DISPLAY_VALUES_FORM: {
        5058: "Approved",
        5060: "Rejected",
        5062: "Approve with Conditions",
      },
    },
    {
      ID: "570",
      NAME: "HARSHA",
      DISPLAY_VALUES_FORM: {
        5052: "Approved",
        5054: "Rejected",
        5056: "Approve with Conditions",
      },
    },
    {
      ID: "572",
      NAME: "KIKUCHI",
      DISPLAY_VALUES_FORM: {
        5046: "Approved",
        5048: "Rejected",
        5050: "Approve with Conditions",
      },
    },
    {
      ID: "574",
      NAME: "UCHIYAMA",
      DISPLAY_VALUES_FORM: {
        5040: "Approved",
        5042: "Rejected",
        5044: "Approve with Conditions",
      },
    },
    {
      ID: "576",
      NAME: "SANO",
      DISPLAY_VALUES_FORM: {
        5034: "Approved",
        5036: "Rejected",
        5038: "Approve with Conditions",
      },
    },
  ];
  return (
    <div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      ></Radio.Group>
      <Divider />
      <Table
        rowSelection={{
          type: selectionType,
        }}
        columns={columns}
        dataSource={tableData}
      />
      <PropertyDetails
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        itemDetails={selectedItemDetails}
        fieldsInfo={fieldsInfo}
      />
    </div>
  );
};

export default App;
