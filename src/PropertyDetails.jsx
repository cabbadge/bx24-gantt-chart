import React from 'react';
import { Modal, Typography, Divider } from 'antd';

const PropertyDetails = ({ isVisible, onClose, itemDetails, fieldsInfo }) => {
  if (!itemDetails) return null;

  const categories = {
    Approved: [],
    Rejected: [],
    "Not Voted": [] 
  };

  const stats = {
    Approved: 0,
    Rejected: 0,
    "Not Voted": 0 
  };

  // Собираем имена голосовавших
  Object.keys(itemDetails)
    .filter(key => key.startsWith('PROPERTY_'))
    .forEach(key => {
      const fieldId = key.replace('PROPERTY_', '');
      const fieldInfo = fieldsInfo.find(info => info.ID === fieldId);
      if (fieldInfo && typeof itemDetails[key] === 'object') {
        Object.entries(itemDetails[key]).forEach(([_, val]) => {
          const status = fieldInfo.DISPLAY_VALUES_FORM[val];
          if (status && categories[status] !== undefined) {
            categories[status].push(fieldInfo.NAME);
            stats[status] += 1;
          }
        });
      }
    });

  // Определяем не голосовавших на основе разности между всеми участниками и голосовавшими
  const allParticipants = fieldsInfo.map(info => info.NAME);
  const votedParticipants = [...categories.Approved, ...categories.Rejected];
  categories["Not Voted"] = allParticipants.filter(name => !votedParticipants.includes(name));
  stats["Not Voted"] = categories["Not Voted"].length;

  const displayCategories = Object.entries(categories).map(([status, names]) => ({
    status,
    names: names.length > 0 ? names.join(' | ') : 'None'
  }));

  return (
    <Modal title="Детали элемента" visible={isVisible} onOk={onClose} onCancel={onClose} width={800}>
      {displayCategories.map(category => (
        <React.Fragment key={category.status}>
          <Typography.Text strong>{category.status}:</Typography.Text> {category.names}
          <Divider />
        </React.Fragment>
      ))}
      {itemDetails.DETAIL_TEXT && (
        <>
          <Typography.Text strong>Описание:</Typography.Text>
          <p style={{ whiteSpace: "pre-line" }}>{itemDetails.DETAIL_TEXT}</p>
          <Divider />
        </>
      )}
      <Typography.Text strong>Статистика:</Typography.Text>
      <p>Подтверждено: {stats.Approved}</p>
      <p>Отклонено: {stats.Rejected}</p>
      <p>Не голосовало: {stats["Not Voted"]}</p>
    </Modal>
  );
};

export default PropertyDetails;
