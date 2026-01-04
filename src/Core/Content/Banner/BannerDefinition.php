<?php declare(strict_types=1);

namespace LandolsiWebdesign\LwSmartBanners\Core\Content\Banner;

use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\BoolField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\DateTimeField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ApiAware;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IntField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\LongTextField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Content\Rule\RuleDefinition;

class BannerDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'lw_smart_banner';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string
    {
        return BannerEntity::class;
    }

    public function getCollectionClass(): string
    {
        return BannerCollection::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new Required(), new PrimaryKey(), new ApiAware()),
            
            (new BoolField('active', 'active'))->addFlags(new ApiAware()),
            
            (new StringField('name', 'name'))->addFlags(new Required(), new ApiAware()),
            
            (new LongTextField('content', 'content'))->addFlags(new Required(), new ApiAware()),
            
            (new StringField('type', 'type'))->addFlags(new Required(), new ApiAware()),
            
            (new StringField('css_class', 'cssClass'))->addFlags(new ApiAware()),
            
            (new FkField('rule_id', 'ruleId', RuleDefinition::class))->addFlags(new ApiAware()),
            
            (new IntField('priority', 'priority'))->addFlags(new Required(), new ApiAware()),
            
            (new DateTimeField('active_from', 'activeFrom'))->addFlags(new ApiAware()),
            
            (new DateTimeField('active_to', 'activeTo'))->addFlags(new ApiAware()),
            
            (new ManyToOneAssociationField('rule', 'rule_id', RuleDefinition::class, 'id', false))->addFlags(new ApiAware()),
        ]);
    }
}
