<?php declare(strict_types=1);

namespace LandolsiWebdesign\LwSmartBanners\Command;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'lw:banner:debug',
    description: 'Debug banner entity'
)]
class BannerDebugCommand extends Command
{
    public function __construct(
        private readonly EntityRepository $bannerRepository
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this->addArgument('name', InputArgument::REQUIRED, 'Banner name');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $name = $input->getArgument('name');
        $context = Context::createDefaultContext();

        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('name', $name));

        $banner = $this->bannerRepository->search($criteria, $context)->first();

        if (!$banner) {
            $io->error(sprintf('Banner "%s" not found', $name));
            return Command::FAILURE;
        }

        $io->section('Banner Debug Info');
        $io->table(
            ['Property', 'Value', 'Type'],
            [
                ['ID', $banner->getId(), 'string'],
                ['Name', $banner->getName(), 'string'],
                ['getActive()', var_export($banner->getActive(), true), gettype($banner->getActive())],
                ['isActive()', var_export($banner->isActive(), true), gettype($banner->isActive())],
                ['Vars dump', '', ''],
            ]
        );

        $io->writeln('Raw entity vars:');
        $io->writeln(print_r($banner->getVars(), true));

        return Command::SUCCESS;
    }
}
