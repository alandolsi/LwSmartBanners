<?php declare(strict_types=1);

namespace LandolsiWebdesign\LwSmartBanners\Core\Content\Banner;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;
use Shopware\Core\Content\Rule\RuleEntity;

class BannerEntity extends Entity
{
    use EntityIdTrait;

    protected ?bool $active = null;

    protected ?string $name;

    protected ?string $content;

    protected ?string $type;

    protected ?string $cssClass;

    /**
     * @var string[]|null
     */
    protected ?array $positions = null;

    protected ?string $displayMode = null;

    protected ?string $overlayAlignment = null;

    protected ?string $ruleId;

    protected ?RuleEntity $rule;

    protected int $priority;

    protected ?\DateTimeInterface $activeFrom;

    protected ?\DateTimeInterface $activeTo;

    public function getActive(): bool
    {
        return (bool) $this->active;
    }

    public function setActive(bool $active): void
    {
        $this->active = $active;
    }

    public function isActive(): bool
    {
        return (bool) $this->active;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): void
    {
        $this->content = $content;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): void
    {
        $this->type = $type;
    }

    public function getCssClass(): ?string
    {
        return $this->cssClass;
    }

    public function setCssClass(?string $cssClass): void
    {
        $this->cssClass = $cssClass;
    }

    /**
     * @return string[]|null
     */
    public function getPositions(): ?array
    {
        return $this->positions;
    }

    /**
     * @param string[]|null $positions
     */
    public function setPositions(?array $positions): void
    {
        $this->positions = $positions;
    }

    public function getDisplayMode(): ?string
    {
        return $this->displayMode;
    }

    public function setDisplayMode(?string $displayMode): void
    {
        $this->displayMode = $displayMode;
    }

    public function getOverlayAlignment(): ?string
    {
        return $this->overlayAlignment;
    }

    public function setOverlayAlignment(?string $overlayAlignment): void
    {
        $this->overlayAlignment = $overlayAlignment;
    }

    public function getRuleId(): ?string
    {
        return $this->ruleId;
    }

    public function setRuleId(?string $ruleId): void
    {
        $this->ruleId = $ruleId;
    }

    public function getRule(): ?RuleEntity
    {
        return $this->rule;
    }

    public function setRule(?RuleEntity $rule): void
    {
        $this->rule = $rule;
    }

    public function getPriority(): int
    {
        return $this->priority;
    }

    public function setPriority(int $priority): void
    {
        $this->priority = $priority;
    }

    public function getActiveFrom(): ?\DateTimeInterface
    {
        return $this->activeFrom;
    }

    public function setActiveFrom(?\DateTimeInterface $activeFrom): void
    {
        $this->activeFrom = $activeFrom;
    }

    public function getActiveTo(): ?\DateTimeInterface
    {
        return $this->activeTo;
    }

    public function setActiveTo(?\DateTimeInterface $activeTo): void
    {
        $this->activeTo = $activeTo;
    }
}
