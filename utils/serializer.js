const serializeCreatorCard = (card, includeAccessCode = true) => {
  const cardObject = card.toObject ? card.toObject() : card;

  const serialized = {
    id: cardObject._id,
    title: cardObject.title,
    description: cardObject.description,
    slug: cardObject.slug,
    creator_reference: cardObject.creator_reference,
    links: cardObject.links,
    service_rates: cardObject.service_rates,
    status: cardObject.status,
    access_type: cardObject.access_type,
    created: cardObject.created,
    updated: cardObject.updated,
    deleted: cardObject.deleted,
  };

  if (includeAccessCode) {
    serialized.access_code = cardObject.access_code || null;
  }

  return serialized;
};

module.exports = serializeCreatorCard;